import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import {Navbar, Nav, Container} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function Home() {
    
    return (
        <div>
            <Navbar bg="light" variant="light">
            <Container fluid>
            <Link to="/"><img src="./images/logo.png" height="50px" width="60px"/></Link>
            <Nav className="container-fluid mx-5 justify-content-end">
                <Link to="/registration"><Button variant="outlined" className="mr-4">Sign Up</Button></Link>
                <Link to="/login"><Button variant="outlined">Login</Button></Link>
                </Nav>
            </Container>
        </Navbar>

            <div style={{backgroundColor:'lightgray', width:'89ch'}} className="container mt-5 p-5">
                <h1>Pizza Delivery 🚚</h1>
                <p style={{fontSize:'20px'}}>Welcome to pizza delivery service. This is the place when you may chose the most delicious pizza you like from wide variety of options!</p>
                <br/>
                <hr/>
                <p style={{fontSize:'20px'}}>We're performing delivery free of charge in case if your order is higher than 20$</p>
               <Link to="/login"><Button fullWidth sx={{ py: "1.5vh" }}  variant="contained">Sign In and order</Button></Link>
            </div>
        </div>
    )
}
