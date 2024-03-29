import mongoose from "mongoose";
import Exam from "./exam.js";
const questionSchema= new mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    question:{
        type: String,
        required: true
    },
    answers:{
        type: [String],
        required: true
    },
    correctAnswer:{
        type:String,
        required: true
    },
    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref: Exam,
       
    }
})

const questions= mongoose.model('questions',questionSchema);

export default questions;