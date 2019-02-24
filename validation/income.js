const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateIncomeInput(data) {
  let errors = {}; // Initialize errors obj

  data.date = !isEmpty(data.date) ? data.date : ''; 
  data.amount = !isEmpty(data.amount) ? data.amount : ''; 
  data.description = !isEmpty(data.description) ? data.description : ''; 
  data.category = !isEmpty(data.category) ? data.category : ''; 

  if(Validator.isEmpty(data.date)) {
    errors.date = 'Date is required';
  }

  if(!Validator.isCurrency(data.amount)) {
    errors.amount = 'Amount needs to be numbers only'
  }

  if(Validator.isEmpty(data.amount)) {
    errors.amount = 'Amount field is required';
  }
  
  if(Validator.isEmpty(data.description)) {
    errors.description = 'Description field is required';
  }
  
  if(Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors) // it'll be valid if errors are empty
  }
}