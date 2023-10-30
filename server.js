////////////// import express for routing /////////////////////////////////////////////////////////////////////////////////////////////////
const express = require('express');

////////////// run npm install mongod and require mongodb and MongoClient ///////////////////////////////////////////////////////////////
const {MongoClient} = require('mongodb');

////////////// route to the database ////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();  
const port = 3001; // port number

////////////// connection string to local instance of MongoDB //////////////////////////////////////////////////////////////////////////////////////////////////
const connectionString = 'mongodb://localhost:27017'; // default port for MongoDB

////////////// initialize a new instance of MongoClient /////////////////////////////////////////////////////////////////////////////////////////////
const client = new MongoClient(connectionString);

////////////// declare a variable to hold the database /////////////////////////////////////////////////////////////////////////////////////////////
let db;

////////////// create variable to hold my database name
const dbName = 'socialMediaDB';

////////////// use connect method to connect to the mongoDB server /////////////////////////////////////////////////////////////////////////////////////////////
client.connect()
    .then(() => {
        console.log('Connected to MongoDB server');
        // assign the database to the db variable //
        db = client.db(dbName); 

        // start the express server //
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err.message);
    });

////////////// Built in Express function that parses incoming requests with JSON payloads /////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.json());

app.post('/user', (req, res) => {
    // Use db connection to insert a new user into the database //
    db.collection('user').insertOne({ 
        name: req.body.name,
        email: req.body.email,
        thoughts: [],
        friends: [],

    })
    .then((result) => {
        console.log(result);
        res.status(200).send('User created');
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Internal server error');
    });
}
);