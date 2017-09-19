// Recipients are subdocs of Survey, and Surveys is a separate collection from Users
const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// Rather than registering this Schema with mongoose, export the Schema,
// which will need to be imported into Survey.js and associate it with the Survey model
module.exports = recipientSchema;
