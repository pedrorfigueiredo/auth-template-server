const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

userSchema.pre('save', function callback(next) {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err2, hash) => {
      if (err2) {
        return next(err2);
      }
      user.password = hash;
      return user.password;
    });

    return next();
  });
});

userSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  callback
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

const ModelClass = mongoose.model('user', userSchema);

module.exports = ModelClass;
