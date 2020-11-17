const mongoose = require('mongoose');

// define schema for the call model
//https://mongoosejs.com/docs/schematypes.html#schematype-options
const userSchema = mongoose.Schema({
    subtenant_id: { type: String, required: true},
    username: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, set: emailAddress => emailAddress.toLowerCase()},
    timestamp: { type: Date, default: Date.now },
}, { collection: 'users' });

// use sort function to reorder (default - sorted by subtenant & email)
userSchema.index({ subtenant_id: 1, email: -1 }, { unique: true })

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);