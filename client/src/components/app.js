import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { testAction } from '../redux/actions'
import Login from './login'
import './styles.css'

const App = (props) => (
  <BrowserRouter>
    <div className="app-container">
      <Route path="/" exact={true} component={Login} />
    </div>
  </BrowserRouter>
)

export default App