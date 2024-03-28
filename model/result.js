import mongoose from 'mongoose';
import User from '../model/user.js';

const resultSchema=({
    score:{
        type:Number,
        required:true
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:User,
       required:true
    }
})

const Result= mongoose.model('Result',resultSchema);

export default Result;