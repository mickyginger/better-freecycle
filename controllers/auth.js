const User = require('../models/user')

function register(req, res, next) {
  User
    .create(req.body)
    .then(() => res.json({ message: 'Registration successful' }))
    .catch(next)
}

function login(req, res, next) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)) return res.sendStatus(401)
      res.json({ message: 'Welcome back', token: user.generateToken() })
    })
    .catch(next)
}

module.exports = {
  register,
  login
}
