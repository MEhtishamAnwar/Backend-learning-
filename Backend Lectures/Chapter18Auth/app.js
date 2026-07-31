// Core Module
const path = require('path');
const DB_PATH = "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/?ssl=true&replicaSet=atlas-g35wou-shard-0&authSource=admin&appName=Cluster0";

// External Module
const express = require('express');
const session=require("express-session");
const mongoDBStroe=require("connect-mongodb-session")(session);


  
//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

const store=new mongoDBStroe({
  uri:DB_PATH,
  collection:"sessions"
});
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret:"my secret",
  resave:false, 
  saveUninitialized:true,
  store:store
}))
app.use((req,res,next)=>{
  // console.log("cookie check meddleware",req.get("cookie"))
  req.isLoggedIn=req.session.isLoggedIn;
  next();
})
app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggedIn){

    next();
  }else{
    res.redirect("/login");
  }

})
app.use("/host", hostRouter);



app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3040;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
