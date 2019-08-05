import express from 'express'
import Task from '../../models/task'

export const addTask = (req, res) => {
  const task = new Task()

  task.description = req.body.description
  task.dueDate = req.body.dueDate
  task.createdAt = req.body.userId

  return task.save((error, doc) => {
    if (error) return res.boom.badImplementation('', { error })
    const newTask = {
      _id: doc._id,
      description: doc.description,
      dueDate: doc.dueDate,
      createdAt: doc.createdAt
    }
    return res.status(200).send({ message: 'Task created', data: newTask })
  })
}