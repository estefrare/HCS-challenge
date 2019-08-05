import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { loginAction } from '../../redux/actions'
import './styles.css'

export class Login extends Component {

  renderField({
    input,
    type,
    placeholder,
    meta: { touched, error }
  }) {
    return (
      <div className="login-input-container">
        <input
          {...input}
          className="login-input"
          placeholder={placeholder}
          type={type}
        />
        {touched && error &&
          (<span className="login-error">
            {error}
          </span>)
        }
      </div>
    )
  }

  render() {
    return (
      <div className="login-container">
        <div className="login-box">
          <Field
            name="username"
            component={this.renderField}
            placeholder="user"
            type="text"
          />
          <Field
            name="password"
            component={this.renderField}
            placeholder="password"
            type="password"
          />
          <button
            disabled={this.props.isFetching}
            className="login-button"
            onClick={this.props.handleSubmit}
          >
            {this.props.isFetching ? 'Loading' : 'Login'}
          </button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.users.isFetching,
})

const LoginWithProps = connect(mapStateToProps)(Login)

const validate = (values) => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Required'
  }
  if (!values.password) {
    errors.password = 'Required'
  }
  return errors
}

const onSubmit = (values, dispatch, props) => {
  dispatch(loginAction(values))
    .then(() => props.history.push('/home'))
}

export default reduxForm({
  form: 'login',
  validate,
  onSubmit,
})(LoginWithProps)
