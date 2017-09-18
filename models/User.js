const mongoose = require('mongoose');
// Unlike MongoDB, mongoose wants to know ahead of time all the different properties in the collection, this is saved as a "schema".
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 } // Default credits 0, otherwise some number
});

// Create a model class and tell mongoose it needs to be aware of userSchema and load it, and to create a new collection called "User" which will be automatically pluralized
// "mongoose.model()" with 1 arg means fetch, with 2 args means load into--see passport.js
mongoose.model('User', userSchema);
