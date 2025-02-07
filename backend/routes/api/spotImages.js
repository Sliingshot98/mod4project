const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { spotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

//creating a spot image
router.post("/:spotId/images", requireAuth, async (req, res) => {
    let { id } = req.user;
    const { spotId } = req.params;
    const { preview } = req.body;
    const theSpot = await Spot.findByPk(spotId);
    if(!theSpot) {
        return res.json({
            message: "Image couldn't be found",
            statuscode: 404,
        });
    }
    const newSpotImage = await spotImage.create({
        key, preview, spotId,
    });
    id = newSpotImage.id;
    res.status(200);
    return res.json({...newSpotImage.toJSON(), imageUrl})
});

//delete a spot image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const imageId = parseInt(req.params.imageId);
    const theImage = await spotImage.findByPk(imageId, {
        include: {model: Spot },
    });
    if (!theImage){
        return res.json({
            message: "Image couldn't be found",
            statuscode: 404,
        });
    }
    await theImage.delete();
    res.status(200);
    return res.json({
        message: "Successfully Deleted",
        statusCode: 200,
    });
});
