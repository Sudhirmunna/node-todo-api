const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
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

  userSchema.statics.findByCredentials = function(email, password) {
    let User = this;

    return User.findOne({email}).then((user) => {
      if(!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, res) => {
          if(res) {
            resolve(user);
          } else {
            reject();
          }
        })
      })
    });
   
  };

  userSchema.pre('save', function(next) {
    let user = this;
    if(user.isModified('password')) {
      console.log(`user is modified ${user}`);
      bcrypt.genSalt(10, (err, salt) => {
        console.log(`salt is generated ${salt}`);
        bcrypt.hash(user.password, salt, (err, hash) =>{
          console.log(`hash is generated ${hash}`);
          user.password = hash;
          next();
        });
      });
    } else {
      next();
    }
});
const User = mongoose.model('Users', userSchema);

module.exports = {User};