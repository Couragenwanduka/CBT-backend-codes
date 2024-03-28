import mongoose from 'mongoose';
import questions from './question';
const examSchema= new  mongoose.Schema({
    title:{
          type:String,
          required:true
    },
    duration:{
        type:Number,
        required:true
    },
    passingScore:{
        type:Number,
        required:true
    },
    questions:{
            type:mongoose.Schema.Types.ObjectId,
            ref:questions,
            required:true
        }
    
})

const Exam= mongoose.model('Exam', examSchema);

export default Exam;