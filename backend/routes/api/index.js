// backend/routes/api/index.js
const router = require('express').Router();
const { setTokenCookie } = require('../../utils/auth.js');
const sessionRouter = require('./sessions.js');
const usersRouter = require('./users.js');

const reviewsRouter = require('./reviews.js');
const spotsRouter = require('./spots.js');
const reviewImageRouter = require("./reviewImages.js")

const bookingsRouter = require('./bookings.js');
const spotsRouter = require('./spots.js');
const reviewsRouter = require('./reviews.js');



const { User } = require ('../../db/models');

const { restoreUser, requireAuth } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/sessions', sessionRouter);
router.use('/spots',spotsRouter);
router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter);
router.use('/reviewImages', reviewImageRouter);



router.use('/spots', spotsRouter);
router.use('/bookings', bookingsRouter);
router.use('/reviews', reviewsRouter);


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});


// GET /api/require-auth
router.get('/require-auth',requireAuth,(req, res) => {
  return res.json(req.user);
});

module.exports = router;
