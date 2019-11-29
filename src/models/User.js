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
    bcrypt.compare(password, this.password, function(error, isMatch) {
        if(error) {
            return callback(error);
        }

        return callback(null, isMatch);
    });
}

function hashPassword(user){
    if(user.changed('password')) {
        return bcrypt.hash(user.password, 10).then(function(password) {
            user.password = password;
        });
    }
}

module.exports = UserModel
