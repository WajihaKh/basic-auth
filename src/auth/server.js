'use strict';

// 3rd Party Resources
require("dotenv").config();
const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const { authInfo } = require('./middleware/basic.js')

// Prepare the express server
const server = express();

// Process JSON input and put the data on req.body
server.use(express.json());
server.use(express.urlencoded({ extended: true }));


const { Users } = require('./models/index.js');

// Process FORM input and put the data on req.body



// Signup Route -- create a new user
// Two ways to test this route with httpie
// echo '{"username":"john","password":"foo"}' | http post :3000/signup
// http post :3000/signup username=john password=foo
server.post('/signup', async (req, res) => {

  try {
    // req.body.password = await bcrypt.hash(req.body.password, 10);
    // const record = await Users.create(req.body);
    const { username, password } = req.body;
    const encyrptpw = await bcrypt.hash(password, 5);
    let record = await Users.create({username, password:encyrptpw});
    res.status(200).json(record);
  } catch (e) { res.status(403).send('Error Creating User'); }
});


// Signin Route -- login with username and password
// test with httpie
// http post :3000/signin -a john:foo
server.post('/signin', authInfo, (req, res) => {

  // try {
  //   const { username, password } = authInfo(req.headers.authorization);
  //   const user = await Users.find({ where: { username: username }});
  //   if (!user) throw new Error('Invalid User');

  //   const valid = await bcrypt.compare(password, user.password);
  //   if (valid) {
      res.status(200).json(req.user);
  //   } else {
  //     throw new Error ('Invalid User')
  //   }
  // } catch (error) { res.status(403).send('Invalid Login'); }
    
});

// make sure our tables are created, start up the HTTP server.
module.exports = server;