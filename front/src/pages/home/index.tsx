import { Box, Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'

export const Home = () => {
  const [response, setResponse] = useState('')
  const getPing = async () => {
    try {
      const res = await fetch('api/')
      const result = await res.json()
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-argument
      setResponse(result.message)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}
      >
        <Typography textAlign='center'> Hello</Typography>
        <Button variant='contained' onClick={() => getPing()} sx={{ width: '200px' }}>
          Click me
        </Button>
        <Grid>{response}</Grid>
      </Grid>
    </Box>
  )
}
