import mongoose from "mongoose";

const carouselSchema = new mongoose.Schema({
      id:{
        type: Number,
        required:true
      },
      image_url:{ 
        type: String, 
        required: true 
      }
});

const Carousel = mongoose.model("Carousel", carouselSchema);

export default Carousel;