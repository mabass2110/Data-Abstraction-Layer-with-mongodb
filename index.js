var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');

// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

// create user account
app.get('/account/create/:name/:email/:password',async function (req, res) {

    const users = await dal.find(req.params.email);
            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                const user = dal.create(req.params.name, req.params.email, req.params.password)
                console.log(user);
                res.send(user);                        
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
    const docs = dal.all();
    console.log(docs);
    res.send(docs)
   
});

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);
