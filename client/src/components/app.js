import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { testAction } from '../redux/actions'
import Login from './login'
import Home from './home'
import './styles.css'

const App = (props) => (
  <BrowserRouter>
    <div className="app-container">
      <Route path="/" exact={true} component={Login} />
      <Route path="/home" exact={true} component={Home} />
    </div>
  </BrowserRouter>
)

export default App