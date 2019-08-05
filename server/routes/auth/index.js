import express from 'express'
import { serverStatus, loginHandler, logoutHandler } from './controller'
import ensureAuthenticated from '../../middlewares/authMiddleware'

const router = express.Router()
router.get('/serverStatus', serverStatus)
router.post('/login', loginHandler)
router.post('/logout', ensureAuthenticated, logoutHandler)

export default router