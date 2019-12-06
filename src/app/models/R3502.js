'use strict'

const Sequelize = require('sequelize')

const config = require('../../config'),
      db = require('../../services/database')

const modelDefinition = {
    r3502_id: {
        type: Sequelize.INTEGER,
        unique: true,
        allowNull: false,
        autoIncrement: true
    },
    dt_atendimento: {
        type: Sequelize.STRING,
    },
    dt_chamada: {
        type: Sequelize.STRING,
    },
    servico: {
        type: Sequelize.STRING,
    },
    agente: {
        type: Sequelize.STRING,
    },
    tempo_fila: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tempo_toque: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tempo_conversa: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    tempo: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    cond_desligamento: {
        type: Sequelize.STRING,
    },

}
    
/* const modelOptions = {
    instanceMethods: {
        comparePasswords: comparePasswords
    },
    hooks: {
        beforeValidate: hashPassword
    }
} */

const R3502Model = db.define('r3502', modelDefinition);

/* 
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
} */

module.exports = R3502Model
