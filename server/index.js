import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import uri from './config';

// 라우트
import postRotes from './routes/api/post.js';

const app = express();

app.use(hpp());
app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

// 몽고DB 연결
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('mongoDB connected!'))
.catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('hi');
});

// 라우트 사용
app.use('/api/post', postRotes)

app.listen(5000, () => {
    console.log('app listen at port 5000');
});