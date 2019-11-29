'use strict'

const config = require('../config'),
      Sequelize = require('sequelize'),
      mysql = require('mysql')

module.exports = new Sequelize(
    config.db.name,
    config.db.user,
    config.db.password,
    config.db.details
)

/* const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
})

conexao.connect(function(err) {
    if(err){
        console.log('puts')
    }else{
        console.log('show')
    }
    
})

module.exports = conexao */