import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import LoginPage from './containers/LoginPage/LoginPage'
import Digest from './containers/Digest/Digest'

import './App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        <Route exact path='/' component={LoginPage} />
        <Route path='/stories' component={Digest} />
      </div>
    )
  }
}

export default App

// look up 'local storage'
