import React,{useContext, createContext, useState, useEffect } from 'react'
import {Navbar, Nav, Container, Button, Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function Navbaar({user}) {
    const [badge, setbadge] = useState(0)
    useEffect(() => {
       let items =  JSON.parse(localStorage.getItem('cart'))
       let sum = 0
       items.forEach(ele => {
        sum+=ele.quantity
       })
       setbadge(sum)
    },[])
    const logout=()=>{
        localStorage.removeItem('_token');
        localStorage.removeItem('cart');
        localStorage.removeItem('order');
    }
    return (
        <div>
            <Navbar bg="light" variant="light">
    <Container fluid>
    <Link to="/menu"><img src="./images/logo.png" height="50px" width="60px"/></Link>
    <Nav className="container-fluid mx-5 justify-content-end">
    <Link to="/menu" style={{textDecoration:"none",color:"black", fontWeight:"bold"}}>Menu</Link>
    <Link to="/cart" style={{textDecoration:"none", color:"black", fontWeight:"bold"}} className="mx-3">Cart <Badge bg="primary">{user===undefined? badge:user}</Badge></Link>
    <Link to="/profile" style={{textDecoration:"none", color:"black", fontWeight:"bold"}}>Profile</Link>
    </Nav>
    <Link to="/" style={{ textDecoration: "none", textAlign: "right" }} onClick={()=>logout()} className="btn btn-danger">Logout</Link>
    </Container>
  </Navbar>
        </div>
    )
}
