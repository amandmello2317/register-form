import React,{useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from 'react-router-dom';


export default function NavBar({login, setLognin}) {
   const navigate = useNavigate()


   const user = JSON.parse(localStorage.getItem('user'))
   console.log(user);

  
 
    const handleLog = () => {
        navigate('/login')
    }
    const handleLogOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.setItem('loginSuccess', JSON.stringify(false))
        navigate('/login')


        
    }

    return (
        <Box sx={{ flexGrow: 1 }}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Employee Details
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {user.name}
                    </Typography>



                    <Button
                        color="inherit"
                        component={Link}
                        to="/">
                        Home
                    </Button>

                    {login === false ? (

                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            onClick={() => handleLog()}
                        >
                            Login
                        </Button>

                    ) : (
                        <Button
                        color="inherit"
                        onClick={() =>handleLogOut()}

                    >
                        LogOut
                    </Button>
                    )}

                    
                </Toolbar>
            </AppBar>

        </Box>
    );
}