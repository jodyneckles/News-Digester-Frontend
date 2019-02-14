import React from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className='login-page'>
      <h1>Welcome to the NEWS DIGEST</h1>
      <h2>Login in or Create a New Account</h2>
      <LoginForm />
    </div>
  )
}

export default LoginPage
