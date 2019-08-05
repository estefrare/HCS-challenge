import express from 'express'
import ensureAuthenticated from '../../middlewares/authMiddleware'
import { addTask, getAllTasks } from './controller'

const router = express.Router()
router.post('/', ensureAuthenticated, addTask)
router.get('/', ensureAuthenticated, getAllTasks)

export default router