import React, { Component } from 'react'

// import Login from './containers/Login'
import Digest from './containers/Digest/Digest'

import './App.css';

class App extends Component {
  render () {
    return (
      <div className='App'>
        {/* <Login /> */}
        <Digest />
      </div>
    )
  }
}

export default App

// look up 'local storage'
