import { CardContent } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import Navbaar from './Navbaar'
import { Navigate } from 'react-router'
import {allorders} from '../config/Myservice'
import jwt_decode from 'jwt-decode';

export default function Profile() {
    const [uid, setUid] = useState('')
    const [data, setdata] = useState([])
    useEffect(() => {

        if (localStorage.getItem('_token') != undefined) {
            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            setUid(decode.uid)
            allorders().then(res => {
                console.log(res.data,"harsh")
                setdata(res.data)
            })
        }
     }, [])
    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
            <Navbaar/>
            <Card className="container mt-5">
                <Card.Body>
                    <p className="font-weight-bold">Email: {uid}</p>
                </Card.Body>
            </Card>

            <h2 className="text-center my-3">Your Previous Order </h2>
            <div className="container">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th> User </th>
                            <th>Price</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    {data.length!=0 ?
                    <tbody>
                        {
                            data.map((ele, index) =>
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{ele.details}</td>
                                    <td>{ele.price}</td>
                                    <td>{ele.status}</td>
                                </tr>
                            )
                        }

                    </tbody>
                   : <h5 className="font-weight-bold mt-3">No Order history</h5> }
                </table>
                </div>
        </div>
        : <Navigate to="/login"></Navigate>}
        </>
    )
}
