import User from '../model/user.js';
import {hashpassword} from '../config/bcrypt.js'

export const saveUser= async(name,email,password,role,learningPath)=>{
    const hashedPassword= await hashpassword(password);
   try{
      const newUser= new User({
         name,
         email,
         password:hashedPassword,
         role,
         learningPath,
      })
      await newUser.save();
      return newUser;
   }catch(error){
    throw new Error ("Couldn't save user" + error)
   }
};

export const findUserByEmail= async(email)=>{
    try{
        const user= await User.findOne({email});
        return user;
    }catch(error){
        throw new Error ("Couldn't find user" + error)
    }
}

export const findAdmins=async()=>{
    try{
        const user= await User.findOne({role:"admin"});
        return user;
    }catch(error){
        throw new Error ("Couldn't find user" + error)
    }
}

export const  updatePassword=async(email,password)=>{
    try{
        const hashedPassword= await hashpassword(password);
  const findUser = await User.findOneAndUpdate(email,{password:hashedPassword},{new:true});
  return findUser;

    }catch(error){
        throw new Error ("Couldn't update password" + error)
    }

}

export const deleteUsers = async (email)=>{
    try{
        const user= await User.findOneAndDelete(email);
        return user;
    }catch(error){
        throw new Error ("Couldn't delete user" + error)
    }
}   