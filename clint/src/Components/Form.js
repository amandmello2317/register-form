import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Grid, Paper } from '@mui/material';
import { port } from '../Gobal';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import BackspaceIcon from '@mui/icons-material/Backspace';

const paperStyle = { padding: 20, width: 280, margin: '20px auto' }




export default function Form() {

    const navigate = useNavigate()


    const [product, setProduct] = useState([])

    let token = JSON.parse(localStorage.getItem('token'))

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value

        })
    }
    console.log(product);


    const handleSubmit = () => {



        axios.post(`${port}/api/product/productinsert`,product,{headers:{"auth-token": token}} )
        .then((res) => {
            console.log("Inserted Info :" + res.data);
            navigate("/view")
        })
        .catch((err) => {
            console.log("Error :" + err);
        })
    }


    return (
        <Grid align='center'>
            <Paper elevation={10} style={paperStyle}>
                <h2>FORM</h2>


                <TextField
                    label="Enter product Name"
                    sx={{ mt: 2 }}
                    onChange={(e) => handleChange(e)}
                    name='name'
                />
                <TextField
                    label="Enter number"
                    sx={{ mt: 2 }}
                    onChange={(e) => handleChange(e)}
                    name='number'
                />
                
                <Button
                    variant="contained"
                    color="success"
                    sx={{ mt: 2 }}
                    onClick={handleSubmit}
                    fullWidth
                >
                    Submit
                </Button>

                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    component={Link} to="/"

                >
                    <BackspaceIcon />
                </Button>



            </Paper>
        </Grid>
    )
}
