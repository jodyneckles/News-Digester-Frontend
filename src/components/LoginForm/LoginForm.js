import React from 'react'
const baseURL = "http://localhost:3001/api/v1/"

const createNewUser = name => {
  return fetch(baseURL + "users", {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: name
    })
  })
}


const LoginForm = () => {
  return (
    <div>
        ** Login form goes here! **
    </div>
  )
}

export default LoginForm
