const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()

const Analista = require('../models/Analista')

router.use(authMiddleware)

//exibe todos
router.get('/', async (req,res) => {
    res.send({user: req.userId})
})

//exibe 1
router.get('/:id_analista', async (req,res) => {
    res.send({user: req.agente})
})

//cadastra
router.post('/', async (req,res) => {
    res.send({user: req.agente})
})

//edita
router.put('/:id_analista', (req,res) => {
    res.send({user: req.agente})
})

//deleta
router.delete('/:id_analista', async (req,res) => {
    res.send({user: req.agente})
})

module.exports = app => app.use('/analista', router)