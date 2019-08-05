import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: String,
  password: String,
  token: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})

export default mongoose.model('User', userSchema)
