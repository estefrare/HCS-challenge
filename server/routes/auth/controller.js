import sha256 from 'sha256'
import User from '../../models/user'
import createToken from '../../helpers/services'

export const serverStatus = (req, res) =>
  res.status(200).send({ status: 'OK' })

export const loginHandler = (req, res) => {
  const token = createToken(req.body.username)
  User.findOneAndUpdate(
    { username: req.body.username, password: sha256(req.body.password) },
    { token },
    (err, doc) => {
      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {
        const user = {
          _id: doc._id,
          username: doc.username,
          token,
        }
        return res.status(200).send({ status: 'OK', data: user })
      }
      return res.boom.unauthorized('Incorrect username or password')
    }
  )
}

export const logoutHandler = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    { token: null },
    (err, doc) => {
      if (err) return res.boom.badImplementation('', { error: err })
      if (doc) {
        return res.status(200).send({ message: 'logout' })
      }
      return res.boom.unauthorized('username doesn`t exist')
    }
  )
}