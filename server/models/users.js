const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email!'
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6
    },
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
  });

  userSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
  };
  // Instance methods
  userSchema.methods.generateAuthTokens = function () {
    let user = this;
    let access = 'auth';
    let token = jwt.sign({ _id: user._id.toHexString(), access}, 'abc123');
    user.tokens = user.tokens.concat([{access, token}]);
    return user.save().then(() => token);
  };
  // Model methods
  userSchema.statics.findByToken = function(token) {
    let User = this;
    let _decoded;
    try {
      _decoded = jwt.verify(token, 'abc123');
    } catch(e) {
      // return new Promise((resolve, reject) => reject());
      return Promise.reject();
    }

    return User.findOne({
      '_id': _decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  };
const User = mongoose.model('Users', userSchema);

module.exports = {User};