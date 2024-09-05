const express = require('express');
const app = express();
const cors = require('cors');
const dal = require('./dal.js');
const e = require('express');
const port = process.env.PORT;
const bodyParser = require("body-parser");

// used to serve static files from public directory
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors());

// create user account
app.post('/account/create', async function (req, res) {
    try {
        const { name, email, password } = req.body; // Assuming you're sending data in the body

        if (!name || !email || !password) {
            return res.status(400).send('All fields are required');
        }

        const users = await dal.find(email);

        // Check if user exists
        if (users.length > 0) {
            console.log('User already exists');
            return res.status(400).send('User already exists');
        }

        // Create new user
        const user = await dal.create(name, email, password); // Ensure create is awaited if it returns a Promise
        console.log(user);
        res.status(201).send(user); // 201 Created status code

    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
});

// login user 
app.get('/account/login/:email/:password', async (req, res) => {

    const user = await dal.find(req.params.email)
            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    

// find user account
app.get('/account/find/:email', async (req, res) => {
    const user = await dal.find(req.params.email)    
    console.log(user);
    res.send(user);
    });


// find one user by email - alternative to find
app.get('/account/findOne/:email',  async(req, res) => {
    const user = await dal.findOne(req.params.email)
    console.log(user);
    res.send(user);
    });


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', async (req, res) => {
    const amount = Number(req.params.amount);
    const response = await dal.update(req.params.email, amount)
    console.log(response);
    res.send(response);
});

// all accounts
app.get('/account/all', async (req, res) => {
    const docs = await dal.all();
    console.log(docs);
    res.send(docs)
   
});

app.listen(port, () => {
    console.log(`The server is running on port http://localhost:${port}`)
})