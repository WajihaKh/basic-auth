'use strict';

const { Users } = require('../models/index.js')
console.log('Users ', Users);
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const authInfo = async (req, res, next) => {
    console.log('req.headers ', req.headers);
    let basicHeaderParts = req.headers.authorization.split(' ');
    console.log('basicHeaderParts ', basicHeaderParts);
    let encodedString = basicHeaderParts.pop();
    console.log('encodedString ', encodedString);
    let decodedString = base64.decode(encodedString);
    console.log('decodedString ', decodedString);
    let [username, password] = decodedString.split(':');
    console.log('username ',username);
    console.log('password ',password);

    try {
    const user = await Users.findOne({ where: { username: username }});
    if (!user) throw new Error('Invalid User');

    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      req.user = user;
      next();
    } else {
      throw new Error ('Invalid password')
    }
  } catch (error) { res.status(403).send('Invalid Login'); }

    return { username, password };
}

module.exports = {authInfo};