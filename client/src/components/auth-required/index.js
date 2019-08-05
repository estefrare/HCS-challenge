import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

const AuthRequired = ({ orRender, token }) => {
  if (!token) {
    return (<Redirect to='/' />)
  } else {
    return (orRender)
  }
}

const mapStateToProps = (state) => ({
  token: state.users.token,
})

export default connect(mapStateToProps)(AuthRequired)