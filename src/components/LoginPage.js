import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        username,
        password,
      })
      console.log('Login successful', response.data)
      localStorage.setItem('jwt', response.data.token)
      history.push('/admin')
    } catch (error) {
      console.error('Login failed', error.response || error)
    }
  }

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
const Wrapper = styled.article`
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;

    h2 {
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 15px;
      text-align: left;

      label {
        display: block;
        margin-bottom: 5px;
      }

      input[type='text'],
      input[type='password'] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

    button {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
      background-color: blue;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: darkblue;
      }
    }
  }
`
export default LoginPage
