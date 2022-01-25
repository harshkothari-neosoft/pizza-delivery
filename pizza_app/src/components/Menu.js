import React, { createContext, useEffect, useState } from 'react'
import Navbaar from './Navbaar'
import { getPost } from '../config/Myservice'
import { Col, Container, Row, Button, Card } from 'react-bootstrap'
import { Navigate } from 'react-router'
export default function Menu() {
    const [state, setstate] = useState([])
    const [info, setinfo] = useState(0)

    const refresh=()=>{
         getPost().then(res=>{
            setstate(res.data)
              console.log(res.data,"dfhj")
           })
            let items = JSON.parse(localStorage.getItem('cart'))
            let sum=0
            if(items.length !=0){
                items.forEach(ele =>{
                    sum+=ele.quantity
                })
            }
            setinfo(sum)
    }

    useEffect(()=>{
        if(localStorage.getItem('_token')!=undefined){
            refresh()
        }
    },[])

    const add = (ele) => {
        let data = JSON.parse(localStorage.getItem('cart'))
        let flag = data.filter(item =>
            item.name === ele.name)
        if(flag.length===0){
        let details = { name: ele.name, price: ele.price, quantity: 1 }
        // let data = JSON.parse(localStorage.getItem('cart'))
        data.push(details)
        localStorage.setItem('cart', JSON.stringify(data))
        alert("Item added succesfully!!")
        }
        else{
            data.map((e,index)=>{
                if(e.name===ele.name){
                    data[index].quantity+=1
                    data[index].price *=data[index].quantity
                    localStorage.setItem('cart', JSON.stringify(data));
                    alert("Added")
                }
            })
        }
        refresh()
      }

    return (
        <>
        {localStorage.getItem('_token')!=undefined ?
        <div>
            
            <Navbaar user={info}/>
        <Container>
        <Row>
        {state.map(ele=>
        <Col>
        <Card style={{ width: '18rem' }} className="my-4">
        <Card.Img variant="top" src={ele.path} />
        <Card.Body>
            <Card.Title>{ele.name}</Card.Title>
            <Card.Text>
         <span>  <Button onClick={()=>add(ele)} className="mr-5">Add to Cart</Button>
         <label className="font-weight-bold"> Price: $ {ele.price} </label> </span>

            </Card.Text>
        </Card.Body>
        </Card>
        </Col>
        )}
        </Row>
        </Container>

        </div>
        : <Navigate to="/login"></Navigate>}
        </>
    )
}
