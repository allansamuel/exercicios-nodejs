const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()

const Analista = require('../models/Analista')

router.use(authMiddleware)

//exibe todos
router.get('/', async (req,res) => {
    res.send({user: res.userId})
})

//exibe 1
router.get('/:id_analista', async (req,res) => {
    res.send({user: res.userId})
})

//cadastra
router.post('/', async (req,res) => {
    try{
        if(await Analista.findOne({
            where: {
                agente: req.body.analista.agente
            }
        })){
            return res.status(400).send({error: 'User already exists'})
        }
        const analista = await Analista.create(req.body.analista)
        return res.send({analista})
    }catch(err) {
        return res.status(400).send({error: 'Error on creating new project'})
    }
})

//edita
router.put('/:id_analista', (req,res) => {
    res.send({user: res.userId})
})

//deleta
router.delete('/:id_analista', async (req,res) => {
    res.send({user: res.userId})
})

module.exports = app => app.use('/analista', router)