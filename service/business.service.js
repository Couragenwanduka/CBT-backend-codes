import {findAllQuestions} from '../service/question.service.js';
import Result from '../model/result.js';

export const results=async(userChoice)=>{
    try{
      const questions=await findAllQuestions();
      const questionArray=[];
      questionArray.push(questions);
      let score = 0
      const findIdAndAnswer= questionArray.forEach(question=>{
        if (question.correctAnswer && question.id === userChoice.id && question.answer === userChoice.answer) {
            score++; // Increment score if correct answer is found
      }
    });
      return score;
      
    }catch(error){
        throw new Error ("could not calculate results for user" + error)
    }
}

export const saveResults=async(user,score)=>{
  try{
    const result = new Result({
      user,
      score,
    });
    const savedResult= await result.save();
    return savedResult;
  }catch(error){
    throw new Error ("could not save results for user" + error)
  }

}