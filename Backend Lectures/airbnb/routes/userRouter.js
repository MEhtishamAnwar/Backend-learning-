// core module
const path=require("path");
const express=require("express");

const {hostRouter}=require("./hostRouter")
const {registerHome}=require("./hostRouter")
const router=express.Router();

const rootDir=require("../utils/pathUtil");

// router.get("/add-home",(req,res,next)=>{
//     console.log(req.url,req.method)
//     res.sendFile(path.join(rootDir, "views", "addhome.html"))
// })
router.get("/",(req, res, next) =>  {
    // console.log(hostRouter);
    console.log(registerHome)
    console.log(req.url, req.method);
    res.render("home",{registerHome: registerHome}); 

});
module.exports=router;