import mongoose from "mongoose";

const foodItemSchema = new mongoose.Schema({
  id: { type: String, required: true },  
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  rating: { type: Number, required: true },  
  food_type: { 
    type: String, 
    enum: ["VEG", "NON-VEG"], 
    required: true 
  }, 
  image_url: { type: String, required: true }
});

const restaurantSchema = new mongoose.Schema({
  id: { type: String, required: true },   
  image_url: { type: String, required: true },
  name: { type: String, required: true },
  cuisine: { type: String, required: true },
  rating: { type: Number, required: true },
  reviews_count: { type: Number, required: true }, 
  cost_for_two: { type: Number, required: true },
  location: { type: String, required: true },
  opens_at: { type: String, required: true }, 
  items_count: { type: Number, required: true }, 
  food_items: [foodItemSchema]
});

const Restaurant = mongoose.model("menu", restaurantSchema);
export default Restaurant;