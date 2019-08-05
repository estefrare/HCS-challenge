import React from 'react'
import { connect } from 'react-redux'
import { testAction } from '../redux/actions'
import Login from './login'
import './styles.css'

const App = (props) => (
  <div className="app-container">
    <Login />
  </div>
)

export default App