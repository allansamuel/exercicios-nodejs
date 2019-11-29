'use strict'

const Sequelize = require('sequelize')
      bcrypt = require('bcrypt-nodejs')

const config = require('../config'),
      db = require('../services/database')


const modelDefinition = {
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}
    
const modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
}

const UserModel = db.define('user', modelDefinition, modelOptions);

function comparePasswords(password, callback){

}

function hashPassword(password, callback){

}

module.exports = UserModel
