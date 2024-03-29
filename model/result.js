import mongoose from 'mongoose';
import Exam from '../model/exam.js';
import User from '../model/user.js';



const resultSchema=({
    score:{
        type:Number,
        required:true
    },
    user:{
       type:String,
       required:true
    },
    exams:{
       type:String,
       required:true,
    }
})

const Result= mongoose.model('Result',resultSchema);

export default Result;