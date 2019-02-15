import React from 'react'

const LoginForm = () => {
  const scrapeUrl = '/api/v1/scrape'

  const scrapeStories = () => {
    return fetch(scrapeUrl)
      .then(res => res.json())
  }

  return (
    <div>
        ** Login form goes here! **
      <button onClick={scrapeStories}>LOGIN</button>
    </div>
  )
}

export default LoginForm
