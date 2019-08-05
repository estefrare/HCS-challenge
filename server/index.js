import express from 'express'
import bodyParser from 'body-parser'
import boom from 'express-boom'
import cors from 'cors'
import config from './env'

const server = express()
const port = config.API_PORT

server.use(boom())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())
server.listen(port)

console.log('Server running in localhost:', port)
