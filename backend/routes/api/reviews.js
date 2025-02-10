const express = require("express");

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review, ReviewImage } = require ('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require("../../utils/auth");
const { Spot, User,ReviewImage,Review } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateReview = [
    check("review")
        .notEmpty()
        .withMessage("Review text is required"),
    check("stars")
        .isInt({ min: 1, max: 5 })
        .withMessage("Stars must be an integer from 1 to 5"),
    handleValidationErrors,
  ];
//creating a review image
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId);
    let { url } = req.body;
    const theReview = await ReviewImage.findByPk(reviewId);
    if(!theReview){
        res.status(404);
        return res.json({
            message: "Review couldn't be found",
        });
    }
    const newReviewImage = await ReviewImage.create({
        url,
        reviewId,
    });
    
    return res.status(200).json({id: newReviewImage.id, url: newReviewImage.url});
});
//MIDDLEWARE
const validateReview = [
  check("review").notEmpty().withMessage("Review text is required"),


  check("stars")
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];



//Get all reviews of the current user
router.get('/current', requireAuth,)
async (req, res) => {
    const { user } = req;
    try {
        const reviews = await Review.findAll( {where: { userId: user.id }});
        
         res.json({ Reviews: reviews });
    } catch (err) {
        res.status(400).json({ message: "Bad Request" });

    }
    return res.json({ Reviews: reviews });
  } 


//Get all reviews by a spots id
router.get('/:spotId/reviews', async(req, res) => {
    const { spotId } = req.params;

 try {
   const spot = await Spot.findByPk(spotId);
   if(!spot){
     res.status(404).json({message: "SPot not found"});
   }
   const reviews= await Review.findAll({where: {spotId: spotId}});
   if(review.length === 0){
     res.status(404).json({message: 'No reviews found for this spot'})
   }
    res.json({reviews});
} catch (err){
    return res.status(400).json({message: 'Bad Request'})
}

});

//adding a review image
router.post("/:reviewId/images", requireAuth, async (req, res) => {
  const reviewId = parseInt(req.params.reviewId);
  let { url } = req.body;
  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({
        message: "Review couldn't be found",
      });
    }
    if (review.ownerId !== req.user.id) {
      return res.status(403).json({
        message: "Forbidden: You do not own this review",
      });
    }
    const imageCount = await ReviewImage.count({ where: { reviewId } });

    if (imageCount >= 10) {
      return res
        .status(403)
        .json({
          message: "Maximum number of images for this resource was reached",
        });
    }
    const newReviewImage = await ReviewImage.create({
      url,
      reviewId,
    });
    let id = newReviewImage.id;
    url = newReviewImage.url;
    res.status(201).json({ id, url });
  } catch (err) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
});

//Edit a review
router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
    const { user } = req;
    const { review, stars } = req.body;
    const { reviewId } = req.params;
    try {
        const existingReview = await Review.findByPk(reviewId);
        if (!existingReview) {
          return res.status(404).json({ message: "Review couldn't be found" });
        } 
        existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    return res.json(existingReview);
    }
 
   catch (err) {
router.put("/:reviewId", requireAuth, validateReview, async (req, res) => {
  const { user } = req;
  const { review, stars } = req.body;
  const { reviewId } = req.params;

  try {
    const existingReview = await Review.findByPk(reviewId);
    if (!existingReview) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
    existingReview.review = review;
    existingReview.stars = stars;
    await existingReview.save();

    return res.json(existingReview);
  } catch (err) {
    return res.status(400).json({
      message: "Bad Request",
    });
}
});
  }
});

//Delete a review
router.delete("/:reviewId", requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const { user } = req;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
    if (review.userId !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    await review.destroy();
    return res.json({ message: "Review deleted" });
  } catch (err) {
    return res.status(400).json({
      message: "Bad Request",
    });
  }
});

module.exports = router;
