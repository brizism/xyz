const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const IncomeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId, // User's ID
    ref: 'users'
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = Income = mongoose.model('income', IncomeSchema);


