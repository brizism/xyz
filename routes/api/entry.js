const express = require('express');
const router = express.Router();

// @route   GET api/entry/test
// @desc    Tests entry route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Entry Works" }));

module.exports = router;