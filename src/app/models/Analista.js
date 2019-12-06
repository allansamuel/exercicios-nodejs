'use strict'

const Sequelize = require('sequelize')

const config = require('../../config'),
      db = require('../../services/database')


/*  `agente` varchar(100) NOT NULL,
    `tipo` varchar(2) NOT NULL,
    `filial` enum('POA','SP') NOT NULL,
    `data_entrada` date DEFAULT NULL,
    PRIMARY KEY (`agente`)
*/

const modelDefinition = {
    agente: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    filial: {
        type: Sequelize.ENUM('POA', 'SP'),
        allowNull: false,
    },
    data_entrada: {
        type: Sequelize.DATE,
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

const AnalistaModel = db.define('analista', modelDefinition);

module.exports = AnalistaModel
