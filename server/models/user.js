const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  googleId: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback)
}

module.exports.getUserByUsername = function (username, callback) {
  const query = { username: username }
  User.findOne(query, callback)
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (err, salt) => {
    if(err) throw err
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if(err) throw err
      newUser.password = hash
      await newUser.save(callback)
    })
  })
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => callback(err, isMatch));
}

