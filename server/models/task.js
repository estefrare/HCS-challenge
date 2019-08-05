import mongoose, { Schema } from 'mongoose'

const task = new Schema({
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  lastUpdate: { type: Date },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Schema.Types.ObjectId, ref: 'User' }
})

export default mongoose.model('Task', task)