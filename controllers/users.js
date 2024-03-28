import {saveUser,findUserByEmail,findAdmins,updatePassword,deleteUsers } from '../service/user.service.js';
import {userValidator,loginValidator} from '../utils/utils.js';
import {comparePassword} from '../config/bcrypt.js'
import jwt from 'jsonwebtoken'

export const createUser=async(req, res,next)=>{
    try{
      const {name,email,password,learningPath}=req.body;
      const valid= userValidator(name,email,password,learningPath);
      if(!valid){
        const error= new Error ('Exam does not exist');
            error.status=400;
            throw error;
      }
      const existingUser= await findUserByEmail(email);
      if(existingUser){
        const error= new Error ('User already exists');
            error.status=400;
            throw error;
      }
      let role= "user";
      const adminRegex=/^[^@\s]+@(?:[^.@\s]+\.)?courage\.com$/
      if(adminRegex.test(email)){
          const findAllAdmins= await findAdmins();
          const adminArray=[];
          adminArray.push(findAllAdmins);
          if(adminArray.length >= 3){
            const error= new Error ('you cannot have move than 3 Admins');
            error.status=400;
            throw error;
          }else{
            role= "admin"
          }
      }
      const user= await saveUser(name,email,password,role,learningPath);
      res.status(201).json({message:"User saved successfully", user});
    }catch(error){
        next(error);
    }
}

export const login= async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const valid= loginValidator(email,password);
        if(!valid){
            const error= new Error ('Invalid inputs');
                error.status=400;
                throw error;
        }
        const user= await findUserByEmail(email);
        if(!user){
            const error= new Error ('User does not exist');
                error.status=400;
                throw error;
        }
        const isMatch= await comparePassword(email,password);
        if(!isMatch){
            const error= new Error ('Invalid password');
                error.status=400;
                throw error;
        }
        const token=jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"1hr"});
        res.cookie('token',token,{httpOnly:true});
        res.status(200).json({message:"User logged in successfully",token});
    
    }catch(error){
        next(error);
    }

}

export const  updateUserPassword= async (req, res,next) =>{
    try{
        const {email,password}=req.body;
        const existingUser= await findUserByEmail(email);
        if(!existingUser){
            const error= new Error ('User does not exist');
            error.status=400;
            throw error;
        }
        const user=await updatePassword(email,password);
        res.status(201).json({message:"Password Updated Successfully",user})
    }catch(error){
        next(error)
    }
}

export const deleteUser = async(req, res, next) =>{
    try{
        const {email}=req.body;
        const existingUser= await findUserByEmail(email);
        if(!existingUser){
            const error= new Error ('User does not exist');
            error.status=400;
            throw error;
        }
        const user=await deleteUsers (email);
        res.status(201).json({message:"User Deleted Successfully",user})
    }catch(error){
        next(error)
    }

}