const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../config')

const router = express.Router()

//função que gera o token, tanto no signin, quanto signup
function generateToken(params = {}){
    return jwt.sign(params, config.keys.secret, {
        expiresIn: 86400, // expira em um dia
    })
}

//rota de registro de usuario
router.post('/register', async (req,res) => {
    const username = req.body.user.username
    try {
        if(await User.findOne({
            where: {
                username: username
            }
        })){
            return res.status(400).send({error: 'User already exists'})
        }
        const user = await User.create(req.body.user)

        user.password = undefined
        return res.send({
            user, 
            token: generateToken({id: user.id})
        })
        
    }catch (err){
        return res.status(400).send({error: 'Registration failed'})
    }
})

//rota de autenticação
router.post('/authenticate', async (req,res) => {
    const {username, password} = req.body.user

    const user = await User.findOne({
        where: {
            username: username
        }
    })

    if(!user)
        return res.status(400).send({error: 'User not found'})

    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({error: 'Invalid password'})

    user.password = undefined

    return res.send({
        user, 
        token: generateToken({id: user.id})
    })
})

module.exports = app => app.use('/auth', router)