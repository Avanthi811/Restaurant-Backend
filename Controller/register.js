import Model from "../Model/User.js";
import bcrypt from "bcrypt";

const register = async (req,res) => {
     try{
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "Failed",
                message: "All fields are required"
            });
        }
        
        const hasedPassword = await bcrypt.hash(password,8)
        const data = new Model({name,email,password: hasedPassword})
        await data.save();
    
        res.status(200).json({
            status:"Success",
            message:"user Registered Successfully...!"
        })
     }catch(e){
        res.status(500).json({
            status:"Failed",
            message:"User Registered Failed...!"
        });
     }
}
export default register;