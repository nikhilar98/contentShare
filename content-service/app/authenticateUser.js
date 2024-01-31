const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = (req,res,next) => {  
    
    const token = req.headers?.authorization?.split(" ")[1]

    if(!token){ 
        return res.status(401).send('insufficient authentication details.')
    }
    try{
        const user = jwt.verify(token,process.env.SECRET_KEY)
        req.user = user
        next()
    }
    catch(err){
        res.status(401).send('insufficient authentication details.')
    }
    

}

module.exports = authenticateUser