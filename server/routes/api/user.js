import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

const router = express.Router();

// 라우트 GET api/user
// all user
// 액세스 public
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if(!users) throw Error('no users');
    res.json(users);

  } catch (err) {
    console.log(err);
    res.status(400).json({msg: err.message});
  }
});

// 라우트 POST api/user
// register user
// 액세스 public
router.post('/', (req, res) => {
  const {name, email, password} = req.body;

  // 간단한 인증
  if (!name || !email || !password) {
    return res.status(400).json({msg: '모든 필드를 채워주세요.'});
  }

  // 이미 가입된 사람인지 확인
  User.findOne({email}).then(user => {
    if (user) return res.status(400).json({msg: '이미 가입된 유저 입니다.'});
    
    const newUser = new User({
      name, email, password
    });

    // hash값으로 암호화
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
      })
    });
  });
});