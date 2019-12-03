const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const config = require('../../config')

const crypto = require('crypto')
const mailer = require('../../modules/mailer')

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

//rota de envio de email com token para mudança de senha
router.post('/forgot_password', async (req, res) => {
    const {email} = req.body.user

    try{

       const user = await User.findOne({where: {email: email}}) 

       if(!user){
           return res.status(400).send({error: 'User not found'})
       }

       //token que será utilizado para que o usuário, ao receber o email, possa usar pra ter ou não acesso à mudança de senha
       const token = crypto.randomBytes(20).toString('hex')

       //data de expiração do token. Agora + 1h
       const now = new Date();
       now.setHours(now.getHours()+1)
       
       await User.update({
           passwordResetToken: token,
           passwordResetExpires: now,},
           {where: {id: user.id}}
        );

       mailer.sendMail({
           to: email,
           from: 'allansamuelg@gmail.com',
           template: '/forgot_password',
           context: {token},
       }, (err) => {
           if(err){
                console.log(err)
               return res.status(400).send({error: 'Can\'t send forgot password email'})
           }
           return res.send()
       })

       
    }catch(err){
        console.log(err)
        res.status(400).send({error: 'Failed on forgot password, try again'})
    }
})

//troca efetiva de senha através do token de confirmação
router.post('/reset_password', async (req, res) => {
    const {email, token, password} = req.body.user
    
    try{
        const user = await User.findOne({where: {email}})

        //verifica se existe o usuario
        if(!user){
            return res.status(400).send({error: 'User not found'})
        }

        //verifica se o token está correto
        if(token !== user.passwordResetToken){
            return res.status(400).send({error: 'Invalid Token'})
        }

        //verifica a validade do token
        const now = new Date()
        if(now> user.passwordResetExpires){
            return res.status(400).send({error: 'Expired Token, try generating another'})
        }

        user.password = password
        await user.save()
        
        res.send();

    }catch(err){
        
        res.status(400).send({error: 'Cannot reset password, try again'})
    }
})
module.exports = app => app.use('/auth', router)