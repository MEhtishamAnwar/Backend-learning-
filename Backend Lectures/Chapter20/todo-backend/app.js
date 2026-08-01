// Core Module
const path = require('path');
const cors = require('cors');
// External Module
const express = require('express');
// const DB_PATH = "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/?ssl=true&replicaSet=atlas-g35wou-shard-0&authSource=admin&appName=Cluster0";
const DB_PATH = "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/todo?ssl=true&replicaSet=atlas-g35wou-shard-0&authSource=admin&appName=Cluster0";
const { default: mongoose } = require('mongoose');
const todoItemsRouter = require('./routes/todoItemsRouter');
 const errorsController = require('./controllers/errors');
const app = express();


app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
app.use("/api/todo", todoItemsRouter);
app.use(errorsController.pageNotFound);

const PORT = 3004;

mongoose.connect(DB_PATH).then(() => {
  console.log('Connected to Mongo');
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch(err => {
  console.log('Error while connecting to Mongo: ', err);
});
