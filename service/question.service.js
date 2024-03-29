import questions from "../model/question.js";

/*
* This function is responsible for finding specific questions
*/
export const findQuestionById=async(id)=>{
  try{
      const question=await questions.findOne({id});
      return question;
  }catch(error){
    throw new Error ("Error while loading question" + error);
  }
};

/*
* This function is responsible for saving the question
*/
export const saveQuestion=async(id,question,answers, correctAnswer, exam)=>{
    try{
        const newQuestion=new questions({
            id,
            question,
            answers,
            correctAnswer,
            exam
        });
        const savedQuestion=await newQuestion.save();
        return savedQuestion;
    }catch(error){
        throw new Error ("Error while saving question" + error);
    }

};

/*
* This function is responsible for updating the question
*/

export const updateQuestion=async(id,question,answers, correctAnswer, exam)=>{
    try{
        const updatedQuestion=await questions.findByIdAndUpdate({id},{
            question,
            answers:[answers],
            correctAnswer,
            exam
        },{new:true});
        return updatedQuestion;
    }catch(error){
        throw new Error ("Error while updating question" + error);
    }
};

/*
* This function is responsible for deleting the question
*/
export const deleteQuestions=async(id)=>{
    try{
        const deletedQuestion=await questions.findByIdAndDelete({id});
        return deletedQuestion;
    }catch(error){
        throw new Error ("Error while deleting question" + error);
    }
};

/*
* This function is responsible for finding all the questions
*/

export const findAllQuestions=async()=>{
    try{
        const question=await questions.find();
        return question;
    }catch(error){
        throw new Error ("Error while loading questions" + error);
    }
};