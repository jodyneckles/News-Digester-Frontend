import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginPage from './containers/LoginPage/LoginPage'
import Digest from './containers/Digest/Digest'
import PathNotFound from './components/PathNotFound/PathNotFound'

import './components/PathNotFound/PathNotFound.css'
import './App.css';

class App extends Component {
  render () {
    return (
      <Switch className='App'>
        <Route exact path='/' component={LoginPage} />
        <Route path='/stories' component={Digest} />
        <Route component={PathNotFound} />
      </Switch>
    )
  }
}

export default App

// look up 'local storage'
