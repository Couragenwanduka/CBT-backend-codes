import mongoose from 'mongoose';
import questions from './question.js';
const examSchema= new  mongoose.Schema({
    title:{
          type:String,
          required:true
    },
    duration:{
        type:String,
        required:true
    },
    passingScore:{
        type:String,
        required:true
    },
    question:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'questions',
        }
    
})

const Exam= mongoose.model('Exam', examSchema);

export default Exam;