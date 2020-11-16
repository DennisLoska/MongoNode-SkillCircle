const mongoose = require('mongoose');

// define schema for the call model
const callSchema = mongoose.Schema({
  transcription: String,
  phone_number: String,
  callback: Boolean,
  country: String,
  timestamp: { type: Date, default: Date.now },
}, { collection: 'calls' });

// create the model for users and expose it to our app
module.exports = mongoose.model('Call', callSchema);
