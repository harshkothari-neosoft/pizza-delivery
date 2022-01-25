import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Navigate } from 'react-router'

export default function OrderPlaced() {
    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
           <Container>
               <h5 className="mt-3">Thank you for choosing us!😉</h5>
                <h1>Order Has Been Placed Successfully!</h1>
                <h4 className="bg-light"> You will Recive Notification On email with Order Details</h4>
                <Link to="/Menu" style={{ textDecoration: "none", textAlign: "right" }} className="btn btn-dark" >Go and Order Somemore</Link>
            </Container>
        </div>
        : <Navigate to="/login"></Navigate>}
        </>
    )
}
