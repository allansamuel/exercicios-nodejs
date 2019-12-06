const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = (req,res,next) => {
    const authHeader = req.headers.authorization

    if(!authHeader){
        return res.status(401).send({error: 'No token provided'})
    }

    const token = authHeader;
    if(!token){
        return res.status(401).send({error: 'Token error'})
    }

    jwt.verify(token, config.keys.secret, (err, decoded) => {
        if(err){
            
            return res.status(401).send({error: 'Token invalid'})
        }
        
        res.userId = decoded.id
        return next()
    })
}