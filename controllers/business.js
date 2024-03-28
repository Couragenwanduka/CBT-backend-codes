import {results} from '../service/business.service.js';
import {saveResults} from '../service/business.service.js';


export const getResults = async (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
      const error= new Error ('No token provided');
      error.status=400;
      throw error;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id,answer}= req.body;
        const result = await results(id, answer);
        if(!result){
            const error= new Error ('error getting results');
            error.status=400;
            throw error;
        }
        await saveResults(decoded, result);
        res.status(200).json({message:"Results uploaded successfully"});
    } catch (error) {
        next(error);
    }
};



