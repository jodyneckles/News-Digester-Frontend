class API {
  static signin (name) {
    return fetch('http://localhost:3001/api/v1/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(name)
    }).then(resp => resp.json())
  }
}

export default API
