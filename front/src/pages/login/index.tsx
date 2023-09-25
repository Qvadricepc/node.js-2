import { Box, Button, CircularProgress, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [cred, setCred] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError('')
    const { name, value } = e.target
    setCred(prevState => ({ ...prevState, [name]: value }))
  }

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cred),
      })
      const response = await res.json()
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`)
      }
      setIsLoading(false)
      localStorage.setItem('@nodejs-test:', response.accessToken)
      navigate('/home')
    } catch (e: any) {
      console.log(e)
      setError(e.message)
      setIsLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper
        sx={{
          width: '550px',
          height: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid sx={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <TextField
              error={error !== ''}
              id='outlined-basic'
              name='email'
              label='email'
              variant='outlined'
              value={cred.email}
              onChange={handleChange}
              helperText={error}
            />
            <TextField
              error={error !== ''}
              id='outlined-basic'
              name='password'
              label='password'
              variant='outlined'
              value={cred.password}
              onChange={handleChange}
              helperText={error}
            />
            <Button variant='contained' onClick={handleLogin}>
              Login
            </Button>
          </Grid>
        )}
      </Paper>
    </Box>
  )
}
