import express from 'express'
import { serverStatus, loginHandler } from './controller'

const router = express.Router()
router.get('/serverStatus', serverStatus)
router.post('/login', loginHandler)

export default router