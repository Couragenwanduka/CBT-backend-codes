import express from 'express';
import {createUser,login,updateUserPassword,deleteUser} from '../controllers/users.js'
import {saveExamQuestion,updateQuestions,deleteQuestion,getAllQuestions} from '../controllers/questions.js'
import {uploadExamDetails,updateExamDetails,deleteExamDetails } from '../controllers/exams.js'
import {getResults,showAllResults} from '../controllers/business.js'
import {checkAdminAccess} from '../middleware/verifyjwt.js'
const router = express.Router();


router.post('/signup',createUser)

router.post('/login',login);

router.patch('/updatePassword',updateUserPassword);

router.delete('/deletePassword',checkAdminAccess,deleteUser);

router.post('/saveExamQuestion',checkAdminAccess,saveExamQuestion);

router.post('/uploadExamDetails',checkAdminAccess,uploadExamDetails);

router.patch('/updateQuestion',checkAdminAccess,updateQuestions);

router.delete('/deleteQuestion',checkAdminAccess,deleteQuestion);

router.get('/getAllQuestions',checkAdminAccess,getAllQuestions);

router.patch('/updateExamDetails',checkAdminAccess,updateExamDetails);

router.delete('/deleteExamDetails',checkAdminAccess,deleteExamDetails);

router.post('/getResults',checkAdminAccess,getResults);

router.get('/getResults',checkAdminAccess,showAllResults);

export default router;