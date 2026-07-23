
// core module
path=require("path");
// external modules
const express=require("express");
const app=express();
  const error=require("./controllers/homes")
app.set('view engine', 'ejs');
app.set("views", 'views');
// local module
const userRouter=require("./routes/userRouter");
const {hostRouter}=require("./routes/hostRouter");
const rootDir=require("./utils/pathUtil");
parseUrlencoded=require("body-parser").urlencoded;
app.use(express.static(path.join(rootDir,"public")));
app.use(parseUrlencoded({extended:false}));  
app.use(userRouter);
app.use(hostRouter);

app.use(error.errorPage);
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000");
}   )