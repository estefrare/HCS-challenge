import express from 'express'
import ensureAuthenticated from '../../middlewares/authMiddleware'
import { addTask, getAllTasks, updateTask, deleteTask } from './controller'

const router = express.Router()
router.post('/', ensureAuthenticated, addTask)
router.get('/', ensureAuthenticated, getAllTasks)
router.put('/:id', ensureAuthenticated, updateTask)
router.delete('/:id', ensureAuthenticated, deleteTask)

export default router