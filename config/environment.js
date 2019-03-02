const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/better-freecycle'
const secret = process.env.SECRET || 'Gs^s6Jak0o£_DaS1'

module.exports = { port, dbURI, secret }
