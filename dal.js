const {MongoClient} = require('mongodb');
require('dotenv').config()
let db;
let conn;
 async function dbconnection(){
    const url = process.env.MONGO_URI;
    const client = new MongoClient(url);
    // connect to mongo
    try {
     conn = await client.connect();
     console.log("Successfully connected");
}   catch(e) {
      console.error(e);
}
     db = conn.db("sample_training");
}
dbconnection()




// create user account using the collection.insertOne function
async function create(name, email, password) {
        const collection = db.collection("users");
        const doc = { name, email, password, balance: 0 };
        const result = await collection.insertOne(doc);
        return doc;
}

// find user account 
async function find(email) {
    try {
        const collection = db.collection('users');
        const customers = await collection.find({ email: email }).toArray();
        return customers;
    } catch (err) {
        throw err; // or handle the error as needed
    }
}
// find user account
async function findOne(email) {
    try{
        const collection = db.collection('users');
        const customer = await collection.findOne({ email: email });
        return customer;
    }
    catch(err){
        throw err;
    }
    }

// update - deposit/withdraw amount
function update(email, amount) {
    const customers = db.collection('users');
    try {
        const result = collection.findOneAndUpdate(
            { email: email },
            { $inc: { balance: amount } },
            { returnOriginal: false }
        );
        return result;
    } catch (err) {
        throw err;
    }

}

async function all() {
    try {
      const customers = await db.collection("users").find({}).toArray();
      return customers;
    } catch (error) {
      throw error;
    }
  }
module.exports = { create, findOne, find, update, all };