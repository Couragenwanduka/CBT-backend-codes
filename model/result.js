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
       type:mongoose.Schema.Types.ObjectId,
       required:true,
       ref:'Exam'
    }
})

const Result= mongoose.model('Result',resultSchema);

export default Result;