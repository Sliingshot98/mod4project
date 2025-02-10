const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require("sequelize")
const router = express.Router();

//MIDDLEWARE
const validateReview  = [
  check("review").notEmpty().withMessage("Review text is required"),

  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors
]



 //Add Query Filters to get all Spots + GET ALL SPOTS
 router.get('/', async (req, res, next) => {
  console.log(req.path)
  const {
    page = 1, 
    size = 10, 
    minLat,
    maxLat,
    minLng,
    maxLng,
    minPrice,
    maxPrice,
  } = req.query;

  const where = {};
  // Add filters based on query parameters
  
  if (minLat) where.lat = { [Op.gte]: parseFloat(minLat) };
  if (maxLat) where.lat = { ...where.lat, [Op.lte]: parseFloat(maxLat) };
  if (minLng) where.lng = { [Op.gte]: parseFloat(minLng) };
  if (maxLng) where.lng = { ...where.lng, [Op.lte]: parseFloat(maxLng) };
  if (minPrice) where.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice) where.price = { ...where.price, [Op.lte]: parseFloat(maxPrice) };

  try { 
    const spots = await Spot.findAll({
      where,
      limit: size,
      offset: (page - 1) * size,
    });
    console.log(spots)
    res.json({ 'Spots':spots})


  } catch (err) {
    console.log(err);
    next(err); 
  }
});
// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res, next) => {
  const { user } = req;
  try {
    const spots = await Spot.findAll({
      where: { ownerId: user.id }
    });
    res.json({ 'Spots': spots });
  } catch (err) {
    next(err)
  }
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res, next) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId);
    if(!spot){
      res.status(404).json({ 'message': "Spot couldn't be found" });
     res.json({'Spot': spot})}
  } catch (err) {
   next(err);
  }
});

// Create a Spot
router.post('/', requireAuth, async (req, res, next) => {

  const { address, 
    city, 
    state, 
    country, 
    lat, 
    lng,
    name, 
    description, 
    price
   } = req.body;

  try {
    const newSpot = await Spot.create({
      ownerId: req.user.id,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price
    });
    res.status(201).json(newSpot);
  } catch (err) {
    next(err)
  }
});


// Edit a Spot
router.put('/:spotId', requireAuth, async (req, res,next) => {
    const { spotId } = req.params;
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
  
    try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
         res.status(404).json({ 'message': "Spot couldn't be found" });
      }
  
      // Check if the current user is the owner of the spot
      if (spot.ownerId !== user.id) {
        res.status(403).json({ 'message': 'Forbidden' });
      }
  
      // Update the spot
      spot.address = address || spot.address;
      spot.city = city || spot.city;
      spot.state = state || spot.state;
      spot.country = country || spot.country;
      spot.lat = lat || spot.lat;
      spot.lng = lng || spot.lng;
      spot.name = name || spot.name;
      spot.description = description || spot.description;
      spot.price = price || spot.price;
  
      await spot.save();
      res.json(spot);
    } catch (err) {
     next(err)}
  });
  
  // Delete a Spot
  router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
  
    try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
         res.status(404).json({ 'message': "Spot couldn't be found" });
      }
  
      // Check if the current user is the owner of the spot
      if (spot.ownerId !== user.id) {
         res.status(403).json({ 'message': 'Forbidden' });
      }
  
      await spot.destroy();
      res.json({ 'message': 'Successfully deleted' });
    } catch (err) {
      next(err)
    }
  });


//Get all reviews by a spots id
  router.get("/:spotId/reviews", async (req, res, next) => {

    const { spotId } = req.params;

    try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      const reviews = await Review.findAll({ where: { spotId: spotId } });
      if (reviews.length === 0) {
        return res
          .status(404)
          .json({ message: "No reviews found for this spot" });
      }
      return res.json({ reviews });
    } catch (err) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
  });

  //create a review for a spot based on the spots id
    
    router.post(
      "/:spotId/reviews",
      requireAuth,
      validateReview,
  
      async (req, res) => {
        const userId = req.user.id;
        const spotId  = parseInt(req.params.spotId);
        const { review, stars } = req.body;
        try {
          const spot = await Spot.findByPk(spotId);
          if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
          }
          const existingReview = await Review.findOne({
            where: { userId: userId, spotId: spot.id },
            });
            if (existingReview) {
            return res.status(500).json({
              message: "User already has a review for this spot",
              });
            }
          const newReview = await Review.create({
            userId,
            spotId,
            review,
            stars
          });
          return res.status(201).json(newReview);
        } catch (err) {
          return res.status(400).json({ message: "Bad Request" });
        }
      }
    );




module.exports = router;



  