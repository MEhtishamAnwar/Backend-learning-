
const express = require('express');
const requestHandler=require("./user")
let x = Math.floor(Math.random() * 21);
const app=express()
app.use("/",(req,res,next)=>{
    console.log( "Request came from 1st middleware",req.url, req.method);   
   
    if(x<10){
         res.send(`<h1>Welcome to Express ${x} </h1>`);
        console.log("x is less than 10, sending response");
          
    }
    else{
         res.send(`<h1>x is not less than 10, ${x} sending response</h1>`);
       console.log(`x is not less than 10, ${x} sending response`);
           
    }
     next();
});
app.use("/submit-details", (req, res, next) => {
    res.send(`<h1>Welcome to the Second Route</h1>`);
    console.log("Request came from 2nd middleware", req.url, req.method);
    next();
});
app.use("/third", (req, res, next) => {
    res.send(`<h1>Welcome to the Third Route</h1>`);
    console.log("Request came from 3rd middleware", req.url, req.method);
    next();
});


const PORT=3009;
app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});