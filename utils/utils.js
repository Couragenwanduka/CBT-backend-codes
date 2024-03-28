import joi from 'joi';
import {examSchema,questionSchema,userSchema,validationSchema} from '../config/joi';

export const examValidator = (title, duration, passingScore)=>{
    try{
       const result= examSchema.validate(title, duration, passingScore)
       return result
    }catch(error){
        throw new Error ("invalid input" + error)
    }
};

export const questionValidator = (id,question, answers, correctAnswer)=>{
    try{
       const result= questionSchema.validate(id,question, answers, correctAnswer)
       return result
    }catch(error){
        throw new Error ("invalid input" + error)
    }
};

export const userValidator = (name, email, password, learningPath)=>{
    try{
       const result= userSchema.validate(name, email, password, learningPath)
       return result
    }catch(error){
        throw new Error ("invalid input" + error)
    }
};

export const loginValidator = (name, email, password)=>{
    try{
       const result= validationSchema.validate(name, email, password)
       return result
    }catch(error){
        throw new Error ("invalid input" + error)
    }
}