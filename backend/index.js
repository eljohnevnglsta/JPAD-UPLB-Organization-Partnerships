import express from 'express';
import cors from 'cors';
import router from './router.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

const app = express();
app.use(cookieParser());

// Apply CORS middleware with options
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT; 

app.listen(PORT, () => {
  console.log(`Server Started at Port ${PORT}`);
});

router(app);