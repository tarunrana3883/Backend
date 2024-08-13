const express=require("express")
const mongoose=require("mongoose")
const router=require('./Routes/Routes')
const dotenv=require('dotenv')
const app=express()
app.use (express.json())
require('dotenv').config()

let mongodburl=`mongodb+srv://${process.env.Usernamedb}:${process.env.Passworddb}@cluster0.29d0m.mongodb.net/Project`
const port=5000|| process.env.port
mongoose.connect(mongodburl)
.then(()=>{console.log("mongodb connected sucessfully");})
.catch((err)=>{console.log(err);})

app.use('/' , router)

app.listen(port,()=>console.log(`server is running ${port}`))