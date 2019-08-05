import express from 'express'
import { serverStatus } from './controller'

const router = express.Router()
router.get('/serverStatus', serverStatus)

export default router