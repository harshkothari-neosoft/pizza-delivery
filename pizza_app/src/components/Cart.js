import React,{ useEffect, useState } from 'react'
import Navbaar from './Navbaar'
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import jwt_decode from 'jwt-decode';

export default function Cart() {
    const navigate = useNavigate()
    const [state, setstate] = useState([])
    const [total, setTotal] = useState(0)
    const [info, setinfo] = useState(0)

    const refresh = () => {
        if(localStorage.getItem('cart') != undefined){

            setstate(JSON.parse(localStorage.getItem('cart')));
            let cartDetails = JSON.parse(localStorage.getItem('cart'));
            let sum = 0;
            cartDetails.forEach(ele => {
                sum += ele.price
            })
          
            setTotal(sum)
            console.log(cartDetails)
            sum=0
            if(cartDetails.length !=0){
                cartDetails.forEach(ele => {
                    sum+=ele.quantity
                })
            }
            setinfo(sum)
        }
    }
    useEffect(() => {
        refresh()
    }, [])

    const order = () => {
        let user = localStorage.getItem('_token')
        let decode = jwt_decode(user);
        localStorage.setItem('order', JSON.stringify({
            details: decode.uid,
            price: total,
            status: "delivered"
        }))
        navigate('/checkout')
    }

    const deleteData = (index) => {
        state.splice(index, 1)
        localStorage.setItem('cart', JSON.stringify(state))
        refresh()
    }
    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
            <Navbaar user ={info}/>
            <h2 className="my-3 text-center">Your Cart</h2>
            {/* <table variant="dark"> */}
            <div className="container">
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr className="">
                        <th>Sr No.</th>
                        <th>Pizza Name</th>
                        <th>Price</th>
                        <th className="text-center">Quantity</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                {state.length!=0 ?
                <tbody>
                    {state.map((ele, index) =>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{ele.name}</td>
                            <td>$ {ele.price}</td>
                            <td className="text-center">{ele.quantity}</td>
                            <td className="text-center"><button className="btn btn-danger" onClick={() => deleteData(index)}>Delete</button></td>
                        </tr>
                    )}
                    <tr>
                        <td colspan='2' className="font-weight-bold">Total </td>
                        <td colspan='2'className="font-weight-bold">$ {total}</td>
                        <td className="text-center"><button className="btn btn-success" onClick={() => order()}>Confirm Order</button></td>
                    </tr>
                </tbody>
                : <h5 className="font-weight-bold mt-3">Cart is empty</h5> }
            </table>
            </div>
        </div>
         : <Navigate to="/login"></Navigate>}
        </>
    )
}
