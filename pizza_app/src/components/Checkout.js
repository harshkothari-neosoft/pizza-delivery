import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Container } from 'react-bootstrap'
import {useNavigate} from 'react-router'
import { placeOrder } from '../config/Myservice'
import Navbaar from './Navbaar'
import { Navigate } from 'react-router'

export default function Checkout() {

    const navigate = useNavigate()
    const [state, setstate] = useState({})
    useEffect(() => {
        let Order = JSON.parse(localStorage.getItem('order'));
        setstate(Order)
    },[])

    const checkout = ()=>{
        placeOrder(state)
        localStorage.removeItem("order");
        navigate('/orderplaced')  
        localStorage.setItem('cart', JSON.stringify([]))
    }
    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
            <Navbaar/>
            <Container>
                <h1 className="my-3">Checkout</h1>
                <form>
                    <div class="form-group">
                        <label>Name as on Card</label>
                        <input type="text" class="form-control" placeholder="Enter Your Name "/> <br/>
                        <label>Credit/Debit Card Number</label>
                        <input type="text" class="form-control" placeholder="Enter 16 digit Card Number"/>
                        <small id="emailHelp" class ="form-text text-muted">We'll never store and share your card details with anyone else.</small> <br/>
                        <div className="row">
                            <div className="col">
                                <label> CVV</label> <br/>
                                <input type="text" placeholder="CVV" minLength="3" maxlength="3" size="8" required/>
                            </div>
                            <div  className="col">
                            <label>Expiry date</label>
                            <input type="" class="form-control" required placeholder="mm-yyyy"/>
                            </div>
                            <div className="col"></div>
                            <div className="col"></div>

                        </div>
                    </div>
                    <h5>Order Total: $ {state.price}</h5>
                    <Link to="/orderplaced" style={{ textDecoration: "none", textAlign: "right" }} onClick={()=>checkout()} className="btn btn-secondary mt-2" >Checkout</Link>
                </form>
            </Container>
        </div>
        : <Navigate to="/login"></Navigate>}
        </>
    )
}
