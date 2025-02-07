const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Review } = require ('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


//MIDDLEWARE
const validateReview =







//Get all reviews of the current user
router.get('/current', requireAuth,
async (req, res) => {
    const { user } = req;
    try {
        const review = await Review.findAll();
        ({
            where: { ownerId: user.id }
        });
         res.json({ Reviews: reviews });
    } catch (err) {
        res.status(400).json({ message: "Bad Request" });
    }
});

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


//create a review for a spot based on the spots id 
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const spotId = req.spot.id
    const {
        review,
        stars
    } = req.body;
    try {
        const spot = await Spot.findByPk(spotId);
        if(!spot){
            return res.status(404).json({message: 'That spot does not exist'})
        }
        const newReview = await Review.create({
            ownerId: userId,
            spotId: spotId,
            review,
            stars
        });
        return res.status(201).json(newReview);
    } catch (err) {
        return res.status(400).json({message: 'Bad Request'})
    }
})

//Edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) =>{
const { user } = req;
const { review, stars } = req.body;
const reviewId = req.params;

try{
    const review = await Review.findByPk(reviewId);
    if(!review) {
        return res.status(404).json({message: 'That review does not exist'})
    }
} catch (err) {
    return res.status(400).json({
        message:'Bad Request'
    });
}
})

//Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const {reviewId} = req.params;
    const {user} = req;

    try {
        const review = await Review.findByPk(reviewId);
        if(!review){
            return res.status(404).json({ message: "Review couldn't be found"});
        }
        if (review.ownerId !== user.id){
            return res.status(403).json({message: 'Forbidden'});
        }
        await review.delete();
        return res.json({message: 'Review deleted'});
    } catch (err) { return res.status(400).json ({
        message: 'Bad Request'
    })}
});

module.exports = router