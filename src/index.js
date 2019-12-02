const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const sequelize = require('sequelize')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const hookJWTStrategy = require('./services/passportStrategy')

const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.use(morgan('dev'))

app.use(passport.initialize())
hookJWTStrategy(passport)

/* app.use(express.static(__dirname + '../../public')); */

app.get('/', (req, res) => {
    res.send('ok')
})

app.listen('4000', () =>{
    console.log('Started')
})