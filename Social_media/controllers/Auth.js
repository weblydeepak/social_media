import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/UserSchema.js";
export const register = async(req,res)=>{
    const {
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      } = req.body;
try {
    const ifemailExists= await User.findOne({
        email:email,
    });
    if(ifemailExists){
        return res.status(400).json({
            message:"email already exists"
        });
    }
    const salt = await bcrypt.genSalt();
    const Hashpass = await bcrypt.hash(password, salt);

    const  newUser = new User({
        firstName,  
        lastName,
        email,
        password: Hashpass,
        picturePath,
        friends,
        location,
        occupation,
        viewedProfile:Math.floor(Math.random() * 10000),
        impressions:Math.floor(Math.random() * 10000)});
     const savedUser=  await newUser.save();
     return res.status(201).json(savedUser)
} catch (error) {
    return res.status(500).json({
        message:error.message
    })
}
}

export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "User does not exist. " });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });
  
      const token = jwt.sign({ id: user._id }, process.env.SECKEY);
      delete user.password;
      res.status(200).json({ 
        message:"login successfu",
        token:token,
        result:user
       });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
// export const login = async(req,res)=>{
//     const {email, password}=req.body;
//      try {
//      const User = await Xyz.findOne({email:email,})
//    if(!User){
//      return res.status(404).json({
//        message:"user is not found",
//      });
//    }
   
//    const isPasswordCorrect = await bcrypt.compare(password, User.password);
//    if(!isPasswordCorrect){
//      return res.status(400).json({
//        message:"Invalid password",
//      });
//    }
//    let payload={User};
//    const token = jwt.sign(payload,  process.env.SECKEY)
//    return res.status(200).json({
//      message:"login successfu",
//      token:token,
//      result:User
//    })
// } catch (err) {
//     return res.status(500).json({
//       message:err.message
//     })
//   }
//   }