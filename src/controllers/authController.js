const express = require('express')

const User = require('../models/User')

const router = express.Router()

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
        return res.send({user});
        
    }catch (err){
        return res.status(400).send({error: 'Registration failed'})
    }
})

module.exports = app => app.use('/auth', router)