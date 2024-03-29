import {findAllQuestions} from '../service/question.service.js';
import Result from '../model/result.js';
import {findExamByTitle} from '../service/exam.service.js'
import {findExamById} from '../service/exam.service.js'
import {findUserById} from '../service/user.service.js'


export const results=async(id,answer)=>{
    try{
      const questions=await findAllQuestions();
     const questionNumber= parseInt(id)
      let score = 0
      const findIdAndAnswer= questions.forEach(question=>{
        if(question.id== questionNumber && question.correctAnswer== answer){
          
          score++; // Increment score if correct answer is found
         
        }else{
          console.log("failed the answer")
        }
    });
   
      return score;
      
    }catch(error){
        throw new Error ("could not calculate results for user" + error)
    }
}

export const saveResults=async(decoded,score,exam)=>{
  try{
    const user= decoded.name; 
    const Exam= await findExamByTitle(exam)
    const exams= Exam.title
    const result = new Result({
      user,
      score,
      exams
    });
    const savedResult= await result.save();
    return savedResult;
  }catch(error){
    throw new Error ("could not save results for user" + error)
  }

}

export const getAllResults = async()=>{
  try{
    const results = await Result.find(); 
    return results;
  }catch(error){
    throw new Error ("could not find results" + error)
  }
}