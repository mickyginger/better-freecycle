const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/environment')

const userSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }
})

userSchema.virtual('password')
  .set(function(password) {
    this._password = password
  })

userSchema.virtual('passwordConfirmation')
  .set(function(confirmation) {
    this._confirmation = confirmation
  })

userSchema.pre('validate', function(next) {
  if(this._password && this._password !== this._confirmation) {
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})

userSchema.pre('validate', function(next) {
  if(this._password) {
    this.passwordHash = bcrypt.hashSync(this._password, bcrypt.genSaltSync(8))
  }
  next()
})

userSchema.methods.validatePassword = function(plaintext) {
  return bcrypt.compareSync(plaintext, this.passwordHash)
}

userSchema.methods.generateToken = function() {
  return jwt.sign({ sub: this._id }, secret, { expiresIn: '6h' })
}

module.exports = mongoose.model('User', userSchema)
