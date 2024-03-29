const MongoClient = require("mongodb").MongoClient;
// require dotenv
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'test';

let cachedDb = null;

const connectToDatabase = async (uri) => {
  // we can cache the access to our database to speed things up a bit
  // (this is the only thing that is safe to cache here)
  if (cachedDb) return cachedDb

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  })

  cachedDb = client.db(DB_NAME)

  return cachedDb
}

const postDatabase = async (db,data) => {

    console.log(data)


    // create the user
    db.collection("projects").insertOne(
    {
        name: data.projectname,
    },
    (err, result) => {}
    )
    
  return {
    statusCode: 201,
  }
}

module.exports.handler = async (event, context) => {
  // otherwise the connection will never complete, since
  // we keep the DB connection alive
  context.callbackWaitsForEmptyEventLoop = false

  const db = await connectToDatabase(MONGODB_URI)

  // get query string parameter called 'data'
  const data = JSON.parse(event.body).data

  // get query string parameter called 'data'
  const user = JSON.parse(event.body).user

  console.log(data)
  console.log(user)

  return postDatabase(db,data)
}
