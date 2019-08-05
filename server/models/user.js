import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: String,
  password: String,
  token: String,
})

export default mongoose.model('User', userSchema)
