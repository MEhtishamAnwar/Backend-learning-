const express=require("express");
const hostRouter=express.Router();
 const parseUrlencoded=require("body-parser").urlencoded;
hostRouter.use(parseUrlencoded({extended:false}));
const path=require("path");
hostRouter.post("/add-home",(req,res,next)=>{
    console.log(req.url,req.method)
    
    res.sendFile(path.join(__dirname,"../views/addhome.html"))
    res.send(`  <h2>Your house name: ${req.body.houseName}</h2>`)
    console.log(req.body.houseName)
})

module.exports=hostRouter;