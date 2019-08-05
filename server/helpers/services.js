// services.js
import jwt from 'jwt-simple'
import moment from 'moment'
import config from '../env'

const createToken = username => {
  const payload = {
    sub: username,
    iat: moment().unix(),
    exp: moment().add(1, 'days').unix(),
  }
  return jwt.encode(payload, config.TOKEN_SECRET)
}

export default createToken