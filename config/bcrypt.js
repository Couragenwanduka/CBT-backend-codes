import bcrypt from 'bcryptjs';
import User from '../model/user.js';

export const hashpassword=async(password)=>{
   try{
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    return hashedPassword;
   }catch(error){
    throw new Error ("error hashing password" + error)
   }
}

export const comparePassword =async(email,password)=>{
    try{
      const findUser = await User.findOne({email})
      if(!findUser){
        throw new Error ("User not found")
      }
      const isMatch = await bcrypt.compare(password,findUser.password);
      return isMatch
    }catch(error){
        throw new Error ("password comparison failed"+error)
        
    }

}