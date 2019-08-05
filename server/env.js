module.exports = {
  API_PORT: process.env.API_PORT || 3000,
  MONGO_DB: process.env.MONGO_DB || 'mongodb://127.0.0.1:27017/hcschallenge',
  TOKEN_SECRET: process.env.TOKEN_SECRET || 'hcschallenge'
}