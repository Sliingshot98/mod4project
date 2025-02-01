const express = require('express');
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

// Get all spots
router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    return res.json({ Spots: spots });
  } catch (err) {
    return res.status(400).json({ message: "Bad request." });
  }
});

// Get all Spots owned by the Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  try {
    const spots = await Spot.findAll({
      where: { ownerId: user.id }
    });
    return res.json({ Spots: spots });
  } catch (err) {
    return res.status(400).json({ message: "Bad request." });
  }
});

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(400).json({ message: "Bad request." });
    }
    return res.json(spot);
  } catch (err) {
    return res.status(400).json({ message: "Bad request." });
  }
});

// Create a Spot
router.post('/', requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, country, lat, lng, name, description, price } = req.body;

  try {
    const newSpot = await Spot.create({
      ownerId: user.id,
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
    return res.status(201).json(newSpot);
  } catch (err) {
    return res.status(400).json({ message: "Bad request." });
  }
});


// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(400).json({ message: "Bad request." });
    }

    // Check if the current user is the owner of the spot
    if (spot.ownerId !== user.id) {
      return res.status(400).json({ message: "Bad request." });
    }

    await spot.delete();
    return res.json({ message: 'Successfully deleted' });
  } catch (err) {
    return res.status(400).json({ message: "Bad request." });
  }
});

//create a spot

module.exports = router;

















module.exports = router;