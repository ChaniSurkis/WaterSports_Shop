import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginStart, loginSuccess, loginFailure } from './userSlice'
import zxcvbn from 'zxcvbn'
import { LinearProgress, Typography, Box } from '@mui/material'

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    tz: '',
    name: '',
    password: '',
    telephone: '',
    email: ''
  })
const testResult = zxcvbn(formData.password)
const score = testResult.score

  const navigate = useNavigate()
  const dispatch = useDispatch()
const getColor = () => {
  switch(score) {
    case 0:
    case 1: return 'error'
    case 2: return 'warning'
    case 3:
    case 4: return 'success'
    default: return 'primary'
  }
}

const getLabel = () => {
  switch(score) {
    case 0: return 'חלשה מאוד'
    case 1: return 'חלשה'
    case 2: return 'בינונית'
    case 3: return 'חזקה'
    case 4: return 'חזקה מאוד'
    default: return ''
  }
}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch(loginStart())

    try {
      const response = await axios.post('http://localhost:4000/user', formData)
      dispatch(loginSuccess(response.data))
      alert('המשתמש נרשם בהצלחה!')
      navigate('/')
    } catch (err) {
      if (err.response && err.response.status === 400) {
        alert('אימייל או תעודת זהות כבר קיימים במערכת')
        dispatch(loginFailure('אימייל או תעודת זהות כבר קיימים במערכת'))
      } else {
        alert('אירעה שגיאה בהרשמה')
        dispatch(loginFailure('אירעה שגיאה בהרשמה'))
      }
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundImage: "url('/picLogin.png')", // ודא שהתמונה קיימת בתקיה public
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '80px',
          borderRadius: '12px',
          boxShadow: '0 0 15px rgba(0,0,0,0.2)',
          width: '100%',
          maxWidth: '800px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          direction: 'rtl',
          color: 'white',
        }}
      >
        <h2 style={{ textAlign: 'center', color: 'white' }}>הרשמה</h2>

        <input name="tz" placeholder="תעודת זהות" value={formData.tz} onChange={handleChange} required style={inputStyle} />
        <input name="name" placeholder="שם" value={formData.name} onChange={handleChange} required style={inputStyle} />
        <input name="password" placeholder="סיסמה" value={formData.password} onChange={handleChange} type="password" required style={inputStyle} />
 {formData.password && (
  <Box sx={{ mt: 1 }}>
    <LinearProgress
      variant="determinate"
      value={(score + 1)*20 }
      color={getColor()}
      sx={{ height: 10, borderRadius: 5, transition: 'all 0.3s ease' }}
    />
    <Typography variant="caption">{getLabel()}</Typography>
  </Box>
)}



        <input name="telephone" placeholder="טלפון" value={formData.telephone} onChange={handleChange} required style={inputStyle} />
        <input name="email" placeholder="אימייל" value={formData.email} onChange={handleChange} required style={inputStyle} />

        <button type="submit" style={buttonStyle}>הירשם</button>
      </form>
    </div>
  )
}

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  outline: 'none'
}

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
}
