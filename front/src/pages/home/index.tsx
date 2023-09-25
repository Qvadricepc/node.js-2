import { Box, Grid, Typography } from '@mui/material'

export const Home = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Grid
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}
      >
        <Typography textAlign='center'> Home page</Typography>
      </Grid>
    </Box>
  )
}
