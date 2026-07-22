// core module
const path=require("path");
const express=require("express");


const router=express.Router();

const rootDir=require("../utils/pathUtil");
router.get("/",(req, res, next) =>  {
    console.log(req.url, req.method);
    res.sendFile(path.join(rootDir, "views", "homeAdd.html")); 
});
router.get("/add-home",(req,res,next)=>{
    console.log(req.url,req.method)
    res.sendFile(path.join(rootDir, "views", "home.html"))
})
module.exports=router;