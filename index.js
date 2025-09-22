import express from "express"; 
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./Router/Router.js";

const app = express(); 
dotenv.config()
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));


const port = process.env.PORT || 5008 
const URI = process.env.MONGO_URI 


mongoose.connect(URI).then(()=>{
    console.log("MongoDB Connected Successfully..!");
    app.listen(port,()=>{
        console.log(`Server started at ${port} port.`);
    });
}).catch(()=>{
    console.log("MongoDB Connection Failed..!");
})

app.use("/api",router);


