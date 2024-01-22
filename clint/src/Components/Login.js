import { Avatar, Button, Grid, Paper, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { port } from '../Gobal';



const paperStyle = { padding: 20, width: 280, margin: '20px auto' }

const avatarStyle = { backgroundColor: 'green' }


export default function Login({setLognin,login}) {
    const [user, setUser] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        if(localStorage.getItem('loginSuccess')==null){
          localStorage.setItem('loginSuccess',JSON.stringify(false))
        }else{
          setLognin(JSON.parse(localStorage.getItem('loginSuccess')))
        }
    
      },[login])

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    console.log(user);


    const handleSubmit = () => {
        if (!user?.email && !user?.password) {
            setError('fill the details')
        }


        axios.post(`${port}/api/user/login`, user)
            .then((res) => {
                if (res.data.success == true) {
                    console.log(res.data.user);

                    localStorage.setItem('token', JSON.stringify(res.data.token))
                    localStorage.setItem('loginSuccess', JSON.stringify(res.data.success))
                    localStorage.setItem('user',JSON.stringify(res.data.user))
                    setLognin(true)
                    console.log("Login Success");
                    navigate('/')

                }else{
                    console.log('Login unsuccessful');
                    setError('Login Fail')
                }
            })
            .catch((err) => {
                console.log('Error :'+ err);
            })



    }

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}> <LockOutlinedIcon /> </Avatar>
                    <h2> Sign in</h2>
                </Grid>

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

                <Button
                    // type='Submit'
                    color='primary'
                    variant='contained'
                    fullWidth
                    sx={{ mt: 1 }}
                    onClick={() => handleSubmit()}
                >
                    Sign In
                </Button>


                <Typography sx={{ mt: 2 }}>
                    Create new Account?
                    <Link to="/signup"> Sign Up</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}
