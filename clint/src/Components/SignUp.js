import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { port } from '../Gobal';




const paperStyle = { padding: 20, width: 280, margin: '20px auto' }

const avatarStyle = { backgroundColor: 'green' }

export default function SignUp() {

    const [user, setUser] = useState()

    const navigate = useNavigate()


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    console.log(user);


    const handleSubmit = () => {
        
        axios.post(`${port}/api/user/signup`, user)
        .then((res) => {
            console.log("Inserted Info :" + res.data);
            navigate("/login")
        })
        .catch((err) => {
            console.log("Error :" + err);
        })
    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}> <LockOutlinedIcon /> </Avatar>
                    <h2> SIGN UP <span style={{fontSize:"1rem"}}> <br />Register</span></h2>
                  

                </Grid>
                <TextField
                    label='Name'
                    placeholder='Enter Name'
                    fullWidth
                    required
                    name='name'
                    onChange={handleChange}

                />
                <TextField
                    label='Email'
                    placeholder='Enter Email'
                    fullWidth
                    required
                    sx={{ mt: 1 }}
                    name='email'
                    onChange={handleChange}


                />
                <TextField
                    label='Password'
                    placeholder='Enter Password'
                    type='password'
                    fullWidth
                    required
                    sx={{ mt: 1 }}
                    name='password'
                    onChange={handleChange}

                />
                <TextField
                    label='Conform Password'
                    placeholder='Enter Conform Password'
                    type='password'
                    fullWidth
                    required
                    sx={{ mt: 1 }}
                    name='cpassword'
                    onChange={handleChange}

                />


                <Button
                    sx={{ mt: 2 }}
                    type='Submit'
                    color='primary'
                    variant='contained'
                    fullWidth

                    onClick={() => handleSubmit()}
                >
                    Sign Up
                </Button>

                <Typography sx={{ mt: 2 }}>
                    Already Have a Account?
                    <Link to="/login">Login</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
