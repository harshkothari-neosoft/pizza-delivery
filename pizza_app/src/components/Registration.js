import React, { useRef, useState } from 'react'
import { Card, CardContent, Button, TextField, FormControl } from '@mui/material'
import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router";
import { addPost } from '../config/Myservice';
import '../App.css'
const regForpassword = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = RegExp(/^[a-zA-Z]/);
const regForContact = RegExp(/^[6-9][0-9]{9}/);
const regForAddress = RegExp(/^[a-zA-Z0-9]{5}/)
export default function Registration() {
    const [errors, seterror] = useState({errname:'', erremail:'', errcontact:'', erraddress:'', errpassword:'', errcpassword:'',password:null});
    const navigate = useNavigate();
    const name = useRef('')
    const email = useRef('')
    const contact = useRef('')
    const address = useRef('')
    const password = useRef('')
    const cpassword = useRef('')

    const handler = (event) => {
        const { name, value } = event.target;
        switch (name) {
         
          case "name":
            let error1 = regForName.test(value) ? " " : "Invalid Name";
            seterror({...errors, errname:error1});
            break;

          case "email":
            let error2 = regForEmail.test(value) ? " " : "Enter Correct Email-Id";
            seterror({...errors, erremail:error2});
            break;

            case "mobile":
            let error3 = regForContact.test(value) ? " " : "Enter Correct Mobile Number";
            seterror({...errors, errcontact:error3});
            break;

            case "address":
            let error4 = regForAddress.test(value) ? " " : "Enter Correct address";
            seterror({...errors, erraddress:error4});
            break;

            case "password":
            let error5 = regForpassword.test(value)
              ? " "
              : "Password Should Contain atleast 8 character with Upper, lower and special character";
              seterror({...errors, errpassword:error5, password:value});
            break;

            case "cpassword":
            let error6 = value === errors.password ? "" : "Password does not match";
            seterror({...errors, errcpassword:error6});
            break;
        }
      };
      
    const validate=async()=>{
        if(name.current.value!='' && email.current.value!='' && contact.current.value!='' && address.current.value!='' && password.current.value!='' && cpassword.current.value!='' ){
            let formData = {
              name:name.current.value,
              email:email.current.value,
              contact:contact.current.value,
              address:address.current.value,
              password: password.current.value,
              cpassword: cpassword.current.value
            }
           await addPost(formData)
          navigate("/login")
            
        }
    }
    return (
        <div style={{backgroundImage:`url('./images/background.jpg')`,height:'657px', backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
          <div class="hiii" style={{paddingTop:"7rem"}} >
        <Card  sx={{ width: "83ch", mx: "auto", mb: "1rem" }}>
        <CardContent>
          <h1 style={{ color: "darkblue", textAlign: "center" }} className="my-3">
            Registration Page
          </h1>

          <Row>
            <Col>
              <FormControl sx={{ my: 1, mx:1, width: "36ch" }}>
                <TextField
                  onBlur={handler}
                  name="name"
                  id="name"
                  inputRef={name}
                  label="Name"
                />
                <span className="text-danger">{errors.errname}</span>
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, mx:1, width: "36ch" }}>
                <TextField
                  onBlur={handler}
                  name="email"
                  id="email"
                  inputRef={email}
                  label="Email"
                />
                <span className="text-danger">{errors.erremail}</span>
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl sx={{ my: 1,mx:1, width: "36ch" }}>
                <TextField
                  onBlur={handler}
                  name="mobile"
                  id="mobile"
                  inputRef={contact}
                  label="Contact Number"
                />
                <span className="text-danger">{errors.errcontact}</span>
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1,mx:1, width: "36ch" }}>
                <TextField
                  onBlur={handler}
                  name="address"
                  id="address"
                  inputRef={address}
                  label="Address"
                />
                <span className="text-danger">{errors.erraddress}</span>
              </FormControl>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormControl sx={{ my: 1, mx:1, width: "36ch" }}>
                <TextField
                  onBlur={handler}
                  name="password"
                  id="password"
                  inputRef={password}
                  type="password"
                  label="Password"
                />
                <span className="text-danger">{errors.errpassword}</span>
              </FormControl>
            </Col>
            <Col>
              <FormControl sx={{ my: 1, mx:1, width: "36ch" }}>
                <TextField
                 onBlur={handler}
                  name="cpassword"
                  id="cpassword"
                  type="password"
                  inputRef={cpassword}
                  label="Confirm password"
                />
                <span className="text-danger">{errors.errcpassword}</span>
              </FormControl>
            </Col>
          </Row>
          <div className="text-center mt-1">   
              <Button
                onClick={validate}
                sx={{ px: "8vh", py: "1.5vh" }}
                variant="contained">
                Register
              </Button>
            <br />

            <FormControl className="mt-2">
              <span> Already Registered? <Link className="mt-5 pt-4" to="/login">Click here to Login</Link></span>
            </FormControl>
          </div>
        </CardContent>
      </Card>
      </div>
      </div>
    )
}
