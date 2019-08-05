import express from 'express'
import ensureAuthenticated from '../../middlewares/authMiddleware'
import { addTask } from './controller'

const router = express.Router()
router.post('/', ensureAuthenticated, addTask)

export default router