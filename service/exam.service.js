import Exam from '../model/exam';

/*
  * this function is used to save exam details
  * it is exported and used in the exam contoller
*/

export const saveExamDetails=(title, duration,passingScore,questions)=>{
         try{
            const exam = new Exam({
                title,
                duration,
                passingScore,
                questions
             });
            exam.save();
            return exam;
         }catch(error){
            throw new Error ("Error saving exam details: " + error)
         }

}
/*
  * this function is used to find exam by title
  * it is exported and used in the exam contoller
*/
export const findExamByTitle =async (title) => {
        try{
            const exam = await Exam.findOne({title});
            return exam;
        }catch(error){
            throw new Error ("Error finding exam by title: " + error)
        }
}
/*
  * this function is used to update all exam details
  * it is exported and used in the exam contoller
*/
export const updateExam = async (title,duration,passingScore,questions) =>{
    try{
        const exam = await Exam.findOneAndUpdate({title},{title,duration,passingScore,questions},{new:true});
        return exam;
    }catch(error){
        throw new Error ("Error updating exam details: " + error)
    }
}

/*
  * this function is used to delete exam by title
  * it is exported and used in the exam contoller
*/

export const deleteExam = async (title) =>{
    try{
        const exam = await Exam.findOneAndDelete({title});
        return exam;
    }catch(error){
        throw new Error ("Error deleting exam: " + error)
    }
}