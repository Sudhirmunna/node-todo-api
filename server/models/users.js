const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1
    }
  });
const User = mongoose.model('Users', userSchema);

module.exports = {User};