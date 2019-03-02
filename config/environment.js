const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mogodb://localhost:27017/better-freecycle'

module.exports = { port, dbURI }
