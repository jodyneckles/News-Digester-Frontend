import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import LoginPage from './containers/LoginPage/LoginPage'
import Digest from './containers/Digest/Digest'
import PathNotFound from './components/PathNotFound/PathNotFound'

import './components/PathNotFound/PathNotFound.css'
import './App.css';

class App extends Component {
  state = {
    name: ''
  }

  signin = name => {
    localStorage.setItem('name', name)
    this.setState({ name: name })
  }

  signout = name => {
    localStorage.removeItem('name')
    this.setState({ name: '' })
  }

  render () {
    const { signin, signout } = this
    const { user } = this.state
    return (
      <Switch className='App'>
        <Route exact path='/' component={routerProps => <LoginPage signin={signin} {...routerProps} />} />
        <Route path='/stories' component={routerProps => <Digest currentUser={this.state.name} {...routerProps} />} />
        {/* <Route component={PathNotFound} /> */}
      </Switch>
    )
  }
}

export default App

// look up 'local storage'
