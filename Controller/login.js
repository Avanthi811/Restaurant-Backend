import Model from "../Model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const login =  async (req,res)=>{
    try{
        console.log(req.body)
        const {name,password} = req.body;

        const user = await Model.findOne({name})
        if (!user){
            return res.status(400).json({
                status: "Failed",
                message:"User not found..!"
            })
        }
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid){
            return  res.status(400).json({
                status: "Failed",
                message:"Invalid credentials..!"
            })
        }
        const token = jwt.sign(
            { id: user._id, name: user.name },        //payload  
            process.env.JWT_SECRET || "secret",     //secret key 
        );

         res.status(200).json({
            status: "Success",
            message: "User Login Successfully..!",
            user: { id: user._id, name: user.name, email: user.email },
            token
        });
    }catch(e){
        
            console.error(e)
        res.status(500).json({
            status:"Failed",
            message:e
        })
    }
}
export default login;