import express from 'express'
import ensureAuthenticated from '../../middlewares/authMiddleware'
import { addTask, getAllTasks, updateTask } from './controller'

const router = express.Router()
router.post('/', ensureAuthenticated, addTask)
router.get('/', ensureAuthenticated, getAllTasks)
router.put('/:id', ensureAuthenticated, updateTask)

export default router