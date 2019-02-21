const express = require('express');
const router = express.Router();

// @route   GET api/summary/test
// @desc    Tests summary route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Summary Works" }));

module.exports = router;