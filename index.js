import express from 'express';
import connectDB from '../src/config/mongodb.js';
import dotenv from 'dotenv';
import router  from '../src/routes/routes.js';

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use (express.urlencoded({ extended: true }));

const port = process.env.Port||5000;

app.use('/',router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});