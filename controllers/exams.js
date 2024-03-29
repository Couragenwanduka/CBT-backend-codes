import { saveExamDetails,findExamByTitle,updateExam,deleteExam } from "../service/exam.service.js";
import {examValidator} from '../utils/utils.js';
import {findQuestionById} from '../service/question.service.js';


/*
*Validation: It validates the input data (title, duration, passingScore) using examValidator. 
* If the data is not valid, it throws an error with a status code of 400.

* Checking Existing Exam: It checks if an exam with the same title already exists 
* by calling findExamByTitle. If an existing exam is found, 
* it throws an error with a status code of 400.

* Finding Questions: It attempts to find questions by their IDs using findQuestionById. 
* If no questions are found, it throws an error with a status code of 400.

* Saving Exam Details: If all validations pass and questions are found, 
*it saves the exam details using saveExamDetails.

* Response: Upon successful creation of the exam, 
* it sends a success response with the saved exam details.
*/
export const uploadExamDetails=async(req, res,next) =>{
      try{
          const {title,duration,passingScore,questionId}=req.body;
          const valid = examValidator(title,duration,passingScore);
          if(!valid){
           const error= new Error ('Invalid inputs');
           error.status=400;
           throw error;
          }
            const existingExam=await findExamByTitle(title);
            if(existingExam){
                const error= new Error ('Exam already exists');
                error.status=400;
                throw error;
            }
            const id= questionId
            const question= await findQuestionById(id);
            if(!question){
                const error= new Error ('couldnt find Question');
                error.status=400;
                throw error;
            }
          const exam=await saveExamDetails(title,duration,passingScore,question);
          return res.status(201).json({message:"Exam Created Successfully",exam})
      }catch(error){
        next(error)
      }
}

/*
  * this function is very similar to the saveExamDetails function it follows almost the same logic
  * except that it updates the exam details instead of creating a new one.
*/
export const  updateExamDetails = async (req,res,next) =>{
    try{
        const {title,duration,passingScore,questionId}=req.body;
        const valid = examValidator(title,duration,passingScore);
        if(!valid){
            const error= new Error ('Invalid inputs');
            error.status=400;
            throw error;
        }
        const existingExam=await findExamByTitle(title);
        if(existingExam){
            const error= new Error ('Exam already exists');
            error.status=400;
            throw error;
        }
        const questions= await findQuestionById(questionId);
        if(!questions){
            const error= new Error ('couldnt find Question');
            error.status=400;
            throw error;
        }
         const exam=await updateExam(title,duration,passingScore,questions);
        return res.status(201).json({message:"Exam Created Successfully",exam})
    }catch(error){
        next(error)
    }
}

/*
 * this function finds an exam using the title and then deletes it from the database 
*  using an imported function from exam.service.js 
*/
export const deleteExamDetails = async (req,res,next) =>{
    try{
        const {title}=req.body;
        const existingExam=await findExamByTitle(title);
        if(!existingExam){
            const error= new Error ('Exam does not exist');
            error.status=400;
            throw error;
        }
        const exam=await deleteExam(title);
        return res.status(201).json({message:"Exam Deleted Successfully",exam})
    }catch(error){
        next(error)
    }
}