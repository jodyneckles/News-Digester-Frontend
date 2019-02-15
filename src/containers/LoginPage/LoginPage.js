// import React from 'react'
// import LoginForm from '../../components/LoginForm/LoginForm'
// import './LoginPage.css'

// const LoginPage = () => {
//   return (
//     <div className='login-page'>
//       <h1>Welcome to the NEWS DIGEST</h1>
//       <h2>Login in or Create a New Account</h2>
//       <LoginForm />
//     </div>
//   )
// }

// export default LoginPage

import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import API from '../../API'
import './LoginPage.css'

class LoginPage extends React.Component {
  state = {
    name: '',
    password: ''
  }

  handleSubmit = () => {
    const { signin, history } = this.props
    const name = this.state
    API.signin(name)
      .then(data => {
        if (data.error) {
          alert('Wrong!!!!!!!!!!!')
        } else {
          signin(data)
          history.push('/stories')
        }
      })
  }

  handleChange = event =>
    this.setState({
      name: event.target.value,
      password: event.target.value
    })

  render () {
    const { name, password } = this.state
    const { handleChange, handleSubmit } = this

    return (
      <div>
        <div className='split left'>
          <div className='row'>
            <img src={require('../../icons/news-digest-logo.svg')} alt='news-digest-logo' />
            <h1 className='news-digest-title'>NEWS DIGEST</h1>
          </div>
          <div >
            <div class='centered'>
              <TextField
                id='usernameInput'
                label='Username'
                value={name}
                onChange={handleChange}
                margin='normal'
                name='name'
              />
              <br />
              <TextField
                id='passwordInput'
                label='Password'
                value={password}
                onChange={handleChange}
                margin='normal'
                name='password'
                type='password'
              />
              <br />
              <Button onClick={handleSubmit} variant='contained' color='primary'>
          SUBMIT
              </Button>
            </div>
          </div>
        </div>
        <div className='split right'>
          <div className='centered' />

        </div>
      </div>
    )
  }
}

export default LoginPage
