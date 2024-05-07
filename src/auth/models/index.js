'use strict';

require('dotenv').config();

const Users = require('./users-model.js')

const { Sequelize, DataTypes } = require('sequelize');

const environment = process.env.NODE_ENV;
const testOrProduction = (environment === 'test' || environment === 'production');

console.log('process.env.DATABASE_URL', process.env.DATABASE_URL)
const sequelize = new Sequelize(process.env.DATABASE_URL, testOrProduction ? { logging: false } : {});

const usersModel = Users(sequelize, DataTypes);

module.exports = {
    db: sequelize,
    Users: usersModel
};