const express = require('express')
const authMiddleware = require('../middleware/auth')
const router = express.Router()
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const Analista = require('../models/Analista')

router.use(authMiddleware)

//exibe todos
router.get('/', async (req,res) => {
    try{
        const analistas = await Analista.findAll() /* .populate('user') */
        if(!analistas){
            return res.status(400).send({error: 'Analista não cadastrado'})    
        }
        res.send({analistas})
    }catch (err) {
        
        return res.status(400).send({error: 'Erro ao buscar analistas'})
    }
})

//exibe por nome
router.get('/:agente', async (req,res) => {
    try{
        const analistas = await Analista.findAll({where: {agente: {[Op.like]: req.params.agente+'%'}}})
        if(!analistas){
            return res.status(400).send({error: 'Analista não cadastrado'})    
        }
        res.send({analistas})
    }catch (err) {
        console.log(err)
        return res.status(400).send({error: 'Erro ao buscar analistas'})
    }
}) 

//cadastra
router.post('/', async (req,res) => {
    try{
        if(await Analista.findOne({
            where: {
                agente: req.body.analista.agente
            }
        })){
            return res.status(400).send({error: 'Analista já cadastrado'})
        }
        const analista = await Analista.create(req.body.analista)
        return res.send({analista})
    }catch(err) {
        return res.status(400).send({error: 'Erro ao cadastrar analista'})
    }
})
 
//edita
router.put('/:agente', async (req,res) => {
    try{
        await Analista.update(req.body.analista,{where: {agente: {[Op.like]: req.params.agente}}})
        
        return res.send()
    }catch (err) {
        console.log(err)
        return res.status(400).send({error: 'Erro ao atualizar analista'})
    }
})

//deleta
router.delete('/:agente', async (req,res) => {
    try{
        
        await Analista.destroy({where: {agente: {[Op.like]: req.params.agente+'%'}}})
    
        return res.send()
    }catch (err) {
        console.log(err)
        return res.status(400).send({error: 'Erro ao desvincular analista'})
    }
})

module.exports = app => app.use('/analista', router)