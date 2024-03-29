import {results} from '../service/business.service.js';
import {saveResults,getAllResults} from '../service/business.service.js';
import jwt from 'jsonwebtoken'


export const getResults = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
      const error= new Error ('No token provided');
      error.status=400;
      throw error;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id,answer,exam}= req.body;
        const result = await results(id, answer);
        // console.log(result);
        if(!result){
            const error= new Error ('error getting results');
            error.status=400;
            throw error;
        }
        
      const studentResult =  await saveResults(decoded.user, result,exam);
        res.status(200).json({message:"Results uploaded successfully",studentResult});
    } catch (error) {
        next(error);
    }
};


export const showAllResults = async(req,res,next)=>{
    try{
        const results= await getAllResults();
        res.status(200).json({results});
        if(!results){
            const error= new Error ('error getting results');
            error.status=400;
            throw error;
        }
    }catch(error) {
        next(error);
    }
}
