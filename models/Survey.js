const mongoose = require('mongoose');
const { Schema } = mongoose;
// Import Recipient to create a subdoc collection
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // Rather than an array of String, list of records conforming to RecipientSchema
  recipients: [RecipientSchema],
  // Multiple clicks will simply toggle boolean
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  /* Set up a relationship to know which survey belongs to which individual user.
  Underscore tells developers this is a reference field--not containing raw data */
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date
});

mongoose.model('Survey', surveySchema);
