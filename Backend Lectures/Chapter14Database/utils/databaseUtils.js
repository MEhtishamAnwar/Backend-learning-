const { MongoClient } = require("mongodb");

// A standard URI avoids the SRV DNS query that this network is refusing.
const MONGO_URL =
  "mongodb://root:root123@ac-q54ihfe-shard-00-00.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-01.7z7on7r.mongodb.net:27017,ac-q54ihfe-shard-00-02.7z7on7r.mongodb.net:27017/airbnb?tls=true&authSource=admin&replicaSet=atlas-g35wou-shard-0&retryWrites=true&w=majority&appName=Cluster0";

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
    });
    _db = client.db("airbnb");
    callback();
  } catch (err) {
    console.error("Error while connecting to MongoDB:", err);
  }
};

const getDb = () => {
  if (!_db) {
    throw new Error("MongoDB is not connected");
  }
  return _db;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
