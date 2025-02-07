const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { Booking, Spot, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Middleware to validate booking input

const validateBooking = [
  check('startDate')
    .exists({ checkFalsy: true })
    .withMessage('Start date is required'),
  check('endDate')
    .exists({ checkFalsy: true })
    .withMessage('End date is required')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date');
      }
      return true;
    }),
  handleValidationErrors,
];

// Get all bookings for the current user

router.get('/current', requireAuth, async (req, res) => {
  const { id } = req.user;
  const bookings = await Booking.findAll({
    where: { userId: id },
    include: [{ model: Spot, attributes: { exclude: ['description', 'createdAt', 'updatedAt'] } }],
  });
  res.json({ Bookings: bookings });
});

// Create a new booking

router.post('/:spotId', requireAuth, validateBooking, async (req, res) => {
  const { id } = req.user;
  const { spotId } = req.params;
  const { startDate, endDate } = req.body;

  const spot = await Spot.findByPk(spotId);
  if (!spot) {
    return res.status(404).json({ message: "Spot couldn't be found" });
  }

  const newBooking = await Booking.create({
    spotId,
    userId: id,
    startDate,
    endDate,
  });

  res.status(201).json(newBooking);
});

// Update a booking

router.put('/:bookingId', requireAuth, validateBooking, async (req, res) => {
  const { id } = req.user;
  const { bookingId } = req.params;
  const { startDate, endDate } = req.body;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "The Booking couldn't be found" });
  }

  if (booking.userId !== id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  booking.startDate = startDate;
  booking.endDate = endDate;
  await booking.save();

  res.json(booking);
});

// Delete a booking

router.delete('/:bookingId', requireAuth, async (req, res) => {
  const { id } = req.user;
  const { bookingId } = req.params;

  const booking = await Booking.findByPk(bookingId);
  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await booking.destroy();
  res.json({ message: 'Successfully deleted' });
});

module.exports = router;