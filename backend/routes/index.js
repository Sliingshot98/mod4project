// backend/routes/index.js
const express = require('express');
const router = express.Router();
const apiRouter = require('./api');

router.use('/api', apiRouter);




router.get("/api/csrf/restore", (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken, {
      httpOnly: false,
      secure: process.env.node_env === "production",
      sameSite: "strict"
    });

    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });

module.exports = router;
