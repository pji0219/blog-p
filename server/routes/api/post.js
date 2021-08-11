import express from 'express';
import Post from '../../models/post';

const router = express.Router();

// api/post
router.get('/',  async (req, res) => {
  // DB에서 모든 포스트를 다 불러옴
  const postFindAll = await Post.find();
  console.log(postFindAll, 'all post get!');
  res.json(postFindAll);
});

router.post('/', async (req, res, next) => {
  try {
    const {title, contents, fileUrl, creator} = req.body;

    // 새로운 포스트 DB에 저장
    const newPost = await Post.create({
      title,
      contents,
      fileUrl,
      creator
    });

    res.json(newPost);

  } catch (err) {
    console.log(err);
  }
});

export default router;