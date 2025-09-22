import restaurant from "../Model/Restaurant.js"

export const getRestaurant = async (req, res) => {
  try {
    let { page = 1, limit = 9 } = req.query
    page = parseInt(page)
    limit = parseInt(limit)
    const sort = req.query.sort || 'Lowest';

    const skip = (page - 1) * limit
   let sortOption = {};
if (sort === "asc") {
  sortOption = { rating: 1 };   // low → high
} else if (sort === "desc") {
  sortOption = { rating: -1 };  // high → low
}


    const restaurants = await restaurant.find()
     .sort(sortOption)
      .skip(skip)
      .limit(limit)

    const total = await restaurant.countDocuments()

    res.json({
      data: restaurants,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Error fetching restaurants:", error)
    res.status(500).json({ message: "Server error" })
  }
}

export const createRestaurant = async (req, res) => {
  try {
    const RestaurantData = req.body;

    if (!Array.isArray(RestaurantData)) {
      return res.status(400).json({
        message: "Please send an array of restaurant objects"
      })
    }

    const newRestaurants = await restaurant.insertMany(RestaurantData);
    res.status(200).json({
      message: "Restaurants added successfully",
      newRestaurants
    })
  } catch (error) {
    console.error("Error creating restaurant:", error)
    res.status(500).json({
      message: "Failed to add restaurants",
      error: error.message
    })
  }
}




export const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params; 
  

    const foundRestaurant = await restaurant.findOne({ id: id });

    if (!foundRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.json(foundRestaurant);
  } catch (error) {
    console.error("Error fetching restaurant by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
};
