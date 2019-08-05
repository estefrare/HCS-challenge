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

export const getAllTasks = (req, res) => {
  Task.find(
    {
      isActive: true,
      createdAt: req.body.userId
    },
    (err, docs) => {
      if (err) return res.boom.badImplementation('', { error: err })
      if (!docs) return res.boom.notFound('Tasks not found')
      return res.status(200).send(docs)
    })
}

export const updateTask = (req, res) => {
  Task.findOneAndUpdate(
    {
      isActive: true,
      _id: req.params.id,
      createdAt: req.body.userId
    },
    {
      description: req.body.description,
      dueDate: req.body.dueDate
    },
    {
      new: true
    },
    (err, doc) => {
      const updatedTask = {
        _id: doc._id,
        description: doc.description,
        dueDate: doc.dueDate,
      }
      if (err) return res.boom.badImplementation('', { error: err })
      if (!doc || !doc._id) return res.boom.notFound('Task not found')
      return res.status(200).send({ message: 'Task updated', data: updatedTask })
    }
  )
}

export const deleteTask = (req, res) => {
  Task.findOneAndUpdate(
    {
      _id: req.params.id,
      createdAt: req.body.userId
    },
    { isActive: false },
    (err, doc) => {
      if (err) return res.boom.badImplementation('', { error: err })
      return res.status(200).send({ message: 'Task removed', data: { _id: req.params.id } })
    }
  )
}