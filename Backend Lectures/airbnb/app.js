
// core module
path=require("path");
// external modules
const express=require("express");
const app=express();
// local module
const userRouter=require("./routes/userRouter");
const hostRouter=require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil");
parseUrlencoded=require("body-parser").urlencoded;
app.use(parseUrlencoded({extended:false}));  
app.use(userRouter);
app.use(hostRouter);
app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
}   )