import express from 'express'
import bodyParser from 'body-parser'
import boom from 'express-boom'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './env'
import router from './routes'

const server = express()
const port = config.API_PORT
const uri = config.MONGO_DB

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)

server.use(boom())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.use('/api', router)
server.listen(port)

console.log('Server running in localhost:', port)
