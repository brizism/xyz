const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateIncomeInput = require('../../validation/income');

// Load Income Model
const Income = require('../../models/Income');
// Load User Model
const User = require('../../models/User');

// @route   GET api/income/test
// @desc    Tests income route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: "Income Works" }));

// @route   GET api/income
// @desc    Get income page
// @access  Private
router.get('/income', passport.authenticate('jwt', { session: false }), (req, res) => { // protected route
  const errors = {};

  Income.findOne({ user: req.user.id })
    .populate('user', ['name', 'avatar'])
    .then(income => {
      if(!income) {
        errors.noincome = 'There is not income added yet';
        return res.status(404).json(errors);
      }
      res.json(income);
    })
    .catch(err => res.status(404).json(err));
})

// @route   POST api/income
// @desc    Create or Edit Income
// @access  Private
router.post('/income', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateIncomeInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 status
    return res.status(400).json(errors);
  }

  // Get fields from form
  const incomeFields = {}; 
  incomeFields.user = req.user.id; // (logged in user)
  if(req.body.date) incomeFields.date = req.body.date;
  if(req.body.amount) incomeFields.amount = req.body.amount;
  if(req.body.description) incomeFields.description = req.body.description;
  if(req.body.category) incomeFields.category = req.body.category;

  Income.findOne({ user: req.user.id })
    .then(income => {
      if(income) {
        // Update
        Income.findOneAndUpdate(
          { user: req.user.id },
          { $set: incomeFields },
          { new: true }
        )
        .then(income => res.json(income));
      } else {
        // Create

        // Save Income
        new Income(incomeFields).save().then(income => res.json(income));
      }
    })
})

module.exports = router;