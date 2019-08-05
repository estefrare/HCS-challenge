import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../env'
import User from '../models/user'

const ensureAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.boom.unauthorized('request without token')
  }
  const token = req.headers.authorization
  let payload

  try {
    payload = jwt.decode(token, config.TOKEN_SECRET, true)
  }
  catch (error) {
    return res.boom.unauthorized('', { message: 'invalid token' })
  }

  if (payload.exp <= moment().unix()) {
    return res.boom.unauthorized('expired token')
  }

  return User.findOne({ username: payload.sub }, 'token', (error, doc) => {
    if (error) return res.boom.badImplementation('', { error })
    if (!doc) return res.boom.unauthorized('user not exist')
    if (!doc.token) return res.boom.unauthorized('session closed')
    if (token !== doc.token) return res.boom.unauthorized('token changed')
    req.body.userId = doc._id
    return next()
  })
}

export default ensureAuthenticated
