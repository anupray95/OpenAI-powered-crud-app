const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient;
let mongoClient;
const MONGO_URL = process.env.MONGO_URL;

const getMongoClient = (async function () {
  try {
    if (mongoClient) return mongoClient;
    mongoClient = await MongoClient.connect(MONGO_URL);
    return mongoClient;
  } catch (error) {
    console.log(error);
  }
}());
module.exports = {
  getMongoClient,
};