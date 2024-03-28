import {saveQuestion,findQuestionById,updateQuestion,deleteQuestions} from '../service/question.service.js';
import {findAllQuestions} from '../service/question.service.js';
import {questionValidator} from '../utils/utils.js'


/*
* This function is responsible for saving questions
*  we deconstruct the the req.body
*  the input are validated against joi schemas
*  using the id we check against the database to see if the question already exists
*  if the question does not exist we save the question
*/
export const saveExamQuestion = async (req, res,next) => {
    try{
        const {id, question,answers,correctAnswer,exam} =req.body
        const valid= questionValidator(id, question,answers,correctAnswer)
        if(!valid){
            const error= new Error ('Invalid inputs');
           error.status=400;
           throw error;
        }
        const existingQuestion= await findQuestionById(id);
        if(existingQuestion){
            const error= new Error ('Question already exists');
           error.status=400;
           throw error;
        }
        const newQuestion= await saveQuestion(question,answers,correctAnswer,exam);
        res.status(201).json({message:"Questions successfully saved",newQuestion});

    }catch(error){
        next(error)
    }
};

/*
* this function follows the same pattern as the saveExamQuestion function
* except that this function updates the question
*/

export const updateQuestion = async(req,res,next)=>{
    try{
      const {id,question,answers,correctAnswer} =req.body
      const valid= questionValidator(id, question,answers,correctAnswer)
      if(!valid){
          const error= new Error ('Invalid inputs');
         error.status=400;
         throw error;
      }
      const existingQuestion= await findQuestionById(id);
      if(!existingQuestion){
          const error= new Error ('Question does not exist');
         error.status=400;
         throw error;
      }
      const updatedQuestion= await updateQuestion(id,question,answers,correctAnswer,exam);
      res.status(201).json({message:"Questions successfully updated",updatedQuestion});
    }catch(error){
        next(error)
    }
};

/*
* this function is responsible for deleting the question
* it checks if the question exists using the question id 
* if it exists it deletes it.
*/
export const deleteQuestion = async(req,res,next)=>{
    try{
      const {id} =req.body
      const existingQuestion= await findQuestionById(id);
      if(!existingQuestion){
          const error= new Error ('Question does not exist');
         error.status=400;
         throw error;
      }
      const deletedQuestion= await deleteQuestions(id);
      res.status(201).json({message:"Questions successfully deleted",deletedQuestion});
    }catch(error){
        next(error)
    }
};

/*
* this function is responsible for getting all the questions
* it gets all the questions from the database
* and returns them to the client
*/

export const getAllQuestions = async (req, res, next) => {
    try{
        const questions= await findAllQuestions();
        res.status(200).json({questions});
    }catch(error){
        next(error)
    }
}