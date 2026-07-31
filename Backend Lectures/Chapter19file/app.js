// Core Module
const path = require('path');

// External Module
const express = require('express');
const session = require('express-session');
const multer= require('multer');
const MongoDBStore = require('connect-mongodb-session')(session);
const DB_PATH = "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/?ssl=true&replicaSet=atlas-g35wou-shard-0&authSource=admin&appName=Cluster0";

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { default: mongoose } = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri: DB_PATH,
  collection: 'sessions'
});
  const randomString=(length)=>{
    const characters='abcdefghijklmnopqrstuvwxyz';
    let result='';
    for(let i=0;i<length;i++){
      result+=characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return result;
  }
 const storage=multer.diskStorage({
  destination: (req,file,cb)=>{
    cb(null,'uploads/')
  },
filename:(req,file,cb)=>{
  cb(null,randomString() + '-' + file.originalname)
},
 })

 const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/jpeg' || file.mimetype==='image/png '|| file.mimetype==='image/jpg'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
}
 const multerOptins ={
  storage, fileFilter
 }

app.use(express.urlencoded());
app.use(multer(multerOptins).single('photo'));
app.use(express.static(path.join(rootDir, 'public')))
app.use('/uploads', express.static(path.join('uploads')));
app.use('/host/uploads', express.static(path.join('uploads')));
app.use('/homes/uploads', express.static(path.join('uploads')));


app.use(session({
  secret: "KnowledgeGate AI with Complete Coding",
  resave: false,
  saveUninitialized: true,
  store
}));

app.use((req, res, next) => {
  req.isLoggedIn = req.session.isLoggedIn
  next();
})

app.use(authRouter)
app.use(storeRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);



app.use(errorsController.pageNotFound);

const PORT = 3003;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
