const express = require('express');
const router = express.Router();
const jwt=require('jsonwebtoken');
const jwtSecret="asd889asds5656asdas887";
const catModel = require('../db/userSchema')
const menuModel = require('../db/menuSchema')
const orderSchema = require('../db/orderSchema')
const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    tls: {
        rejectUnauthorized: false
    },
    auth: {
        user: "harshk6300@gmail.com",
        pass: "Harsh@12345"
    }
})
router.post("/addpost",(req,res)=>{
    let ins = new catModel({name:req.body.name,email:req.body.email,contact:req.body.contact, address:req.body.address,password:req.body.password, cpassword:req.body.cpassword})
    console.log(ins)
    ins.save((e)=>{
        if(e){
            res.send("Already added")
        }
        else{
            res.send("category added")
        }
    })
})

router.get("/getpost",(req,res)=>{
    menuModel.find({},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data)
        }
       })
})

router.get("/fetchdata",(req,res)=>{
    catModel.find({},(err,data)=>{
        if(err) throw err;
        else{
        res.send(data)
        }
       })
})

router.get("/allorders", (req, res) => {
    orderSchema.find({}, (err, data) => {
        if (err) throw err;
        else {
            res.send(data)
        }
    })
})

router.post('/placeorder', (req, res) => {

    let insert2 = new orderSchema({
        details: req.body.details,
        price: req.body.price,
        status: req.body.status,
      
    })
    console.log(insert2, "line 15")

    insert2.save((e) => {
        console.log(e)
        if (e) {
            res.send("Already added")
        }
        else {
            transporter.sendMail({
                from: 'harshk6300@gmail.com',
                to: req.body.details,
                subject: "order Confirmation",
                html: `<h3>${req.body.details}</h3><p>Your order is confirmed</p>`,
                // text: "Your order is"
            },(error,res)=>{
                if(error){console.log(error)}else{console.log("mail sent",res)}
            });
            res.send("category added")
        } 
    })
})

router.post("/validate", (req, res) => {
    let email=req.body.email;
    let password=req.body.password;
    catModel.findOne({email:email,password:password},(err,data)=>{
        if(err){
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else if(data==null)
        {
            res.json({"err":1,"msg":"Email or password is not correct"})
        }
        else {
            let payload={
                uid:email
                // uname:data.name
            }
            const token=jwt.sign(payload,jwtSecret,{expiresIn:360000})
            res.json({"err":0,"msg":"Login Success","token":token})
        }
    })
})
module.exports=router;