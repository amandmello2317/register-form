import { Button, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'


const paperStyle = { padding: 20, width: 280, margin: '100px auto' }

export default function Home() {
  
  const navigate = useNavigate()
  useEffect(() => {
    if(!localStorage.getItem('token') ){
      navigate('/login')
    }
  },[])

  return (
    <div>
      <Paper elevation={10} style={paperStyle}>
        <Button component={Link} to="/form" variant="contained" color="primary" fullWidth>
          Add Users
        </Button>
        <Button component={Link} to="/view" variant="contained" color="primary" fullWidth sx={{mt:2}}>
          View
        </Button>



       
      </Paper>
    </div >
  )
}
