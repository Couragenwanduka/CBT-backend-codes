import express from 'express';
import connectDB from '../src/config/mongodb.js';
import dotenv from 'dotenv';
import router  from '../src/routes/routes.js';
import { errorHander} from '../src/middleware/errorhander.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();
const PORT =  4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(errorHander);

app.use('/', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});