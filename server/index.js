import express from 'express';
import mongoose from 'mongoose';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

// 라우트
import postRoutes from './routes/api/post.js';
import userRoutes from './routes/api/user.js';

const app = express();

const { MONGO_URI } =config;

app.use(hpp());
app.use(helmet());

app.use(cors({
    origin: true,
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());

// 몽고DB 연결
mongoose.connect(MONGO_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(() => console.log('mongoDB connected!'))
.catch(error => console.log(error));

// 라우트 사용
app.use('/api/post', postRoutes);
app.use('api/user', userRoutes);

app.listen(7000, () => {
    console.log('app listen at port 7000');
});