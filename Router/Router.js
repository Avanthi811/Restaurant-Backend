import register from "../Controller/register.js";
import login from "../Controller/login.js";
import express from "express"; 
import validation from "../Middleware/auth.js";
import { getCarousel,addCarousel } from "../Controller/carousel.js";
import { getRestaurant,getRestaurantById,createRestaurant } from "../Controller/restaurant.js";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/home", validation, (req,res)=>{
    res.json({
        message:"qwerty",
        user:req.user
    })
})
router.post("/carousel",addCarousel)
router.get("/carousel",getCarousel)
router.get("/restaurant", getRestaurant);
router.post("/restaurant", createRestaurant);
router.get("/restaurant/:id", getRestaurantById);
export default router;