// Core Module
const path = require('path');
const mongoose = require("mongoose");
// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");
const { error } = require('console');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
const DB_PATH=  "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/airbnb?tls=true&authSource=admin&replicaSet=atlas-g35wou-shard-0&retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(DB_PATH).then(() => {
  app.listen(PORT, () => {
    console.log("mongo is connected")
  console.log(`Server running on address http://localhost:${PORT}`);
});
}).catch(err => {
   console.log("Error while connecting mongo",err)
})
