const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();
//MIDLEWARE
const validateReviewImage = 





//creating a review image
router.post("/:reviewId/images", requireAuth, async (req, res, next) => {
    const reviewId = parseInt(req.params.reviewId);
    let { url } = req.body;
    const theReview = await ReviewImage.findByPk(reviewId);
    if(!theReview){
        res.status(400);
        return res.json({
            message: "Review couldn't be found",
            statuscode: 404,
        });
    }
    const newReviewImage = await ReviewImage.create({
        url,
        reviewId,
    });
    let id = newReviewImage.id;
    url = newReviewImage.url;
    res.status(200);
    return res.json({id, url});
});

//deleting a review image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = parseInt(req.params.imageId);
    const theImage = await reviewId.findByPk(imageId, {
        include: {model: Review},
    });
    if(!theImage) {
        req.status(404);
        return res.json({
            message: "review Image couldn't be found",
            statuscode: 404,
        });
    }
    await theImage.delete();
    res.status(200);
    return res.json({
        message: "Successfully Deleted",
        statuscode: 200,
    });
});

module.exports = router;