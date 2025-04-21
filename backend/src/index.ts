import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/authRouter';
import userRouter from './routes/userRouter';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))
app.use('/api/v1/auth',authRouter)
app.use('/api/v1/users',userRouter)
const PORT = process.env.PORT || 5000;

// app.get('/', (_, res: Response)=> {
//   res.send('Hello Fuck the World!!');
// })

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
})