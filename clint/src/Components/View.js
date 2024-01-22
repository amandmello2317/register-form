import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { port } from '../Gobal';
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BackspaceIcon from '@mui/icons-material/Backspace';
import EditModel from './EditModal';





const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


export default function View() {

    const [data, setData] = useState([])
    const [openEdit, setOpenEdit] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState([])
    const [count, setcount] = useState(false)


    let token = JSON.parse(localStorage.getItem('token'))

    useEffect(() => {
        axios.get(`${port}/api/product/productView`,{headers:{"auth-token": token}} )
            .then((res) => {
                console.log(res.data);
                setData(res.data)
            }).catch((err) => {
                console.log("Error :" + err);
            })


    }, [openEdit, count])


    const handleClose = () => {
        setOpenEdit(false)

    }

    const handleEdit = (e) => {
        setOpenEdit(true)
        console.log(e);
        setSelectedProduct(e)
    }



    console.log(setSelectedProduct, 1);

    const handleDelete = (id) => {
        axios.delete(`${port}/api/product/productDelete/${id}`,{headers:{"auth-token": token}})
        .then((res) => {
            console.log(res.data);
            setcount((prev) => !prev)
        }).catch((err) => {
            console.log("Error :" + err);
        })
        console.log(id);
    }



    return (
        <>
            <Box>

                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow >
                                <StyledTableCell>id</StyledTableCell>
                                <StyledTableCell>Posted by</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Number</StyledTableCell>
                                
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((i, index) => (

                                <StyledTableRow >
                                    <StyledTableCell component="th" scope="row">
                                        {index = index + 1}
                                    </StyledTableCell>


                                    <StyledTableCell>{i.userId.name}</StyledTableCell>
                                    <StyledTableCell>{i.name}</StyledTableCell>
                                    <StyledTableCell>{i.number}</StyledTableCell>
                                
                               
                                    <StyledTableCell>

                                        <Button onClick={() => handleEdit(i)}>Update</Button>
                                        <Button onClick={() => handleDelete(i._id)}>Delete</Button>
                                    </StyledTableCell>

                                </StyledTableRow>


                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                


                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>

                <Button
                    sx={{ mt: 2 }}
                    variant="contained"
                    component={Link} to="/"

                >
                    <BackspaceIcon />
                </Button>
                </Box>

                
            </Box>

            <EditModel
                setSelectedProduct={setSelectedProduct}
                selectedProduct={selectedProduct}
                data={data}
                handleClose={handleClose}
                openEdit={openEdit}
                setOpenEdit={setOpenEdit}
            />
        </>


    );
}