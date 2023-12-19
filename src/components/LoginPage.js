import React, { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { API_ENDPOINT } from '../config'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${API_ENDPOINT}/users/login`, {
        username,
        password,
      })
      localStorage.setItem('jwt', response.data.token)
      history.push('/admin')
    } catch (error) {
      console.error('Login failed', error.response || error)
    }
  }

  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .login-container {
    max-width: 400px;
    width: 100%;
    padding: 20px;
    text-align: center;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

    h2 {
      margin-bottom: 20px;
      color: #333;
    }

    .form-group {
      margin-bottom: 15px;
      text-align: left;

      label {
        display: block;
        margin-bottom: 5px;
        color: #333;
      }

      input[type='text'],
      input[type='password'] {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
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
