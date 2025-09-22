import Carousel from  "../Model/Carousel.js";

export const getCarousel = async(req,res)=>{
    try{
        const images = await Carousel.find();
        res.status(200).json({
            status:"Success",
            data:images
        })
    }catch(e){
        res.status(500).json({
            status:"Failure",
            message:"failedd to fetch Carousel",e
        })
    }
}

export const addCarousel = async (req, res) => {
  try {
    const images = req.body; 

    if (!Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ message: "Please send an array of images" });
    }

    const newImages = await Carousel.insertMany(images);

    res.status(201).json({
      message: "Images added successfully",
      newImages
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add carousel images",
      error: error.message
    });
  }
};