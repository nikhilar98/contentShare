const {pick} = require('lodash')
const axios = require('axios')
const Content = require('./contentModel')
const {validationResult}  = require('express-validator')


const contentCtlr = {} 


contentCtlr.create = async (req,res) =>  { 

    const errors = validationResult(req) 

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body = pick(req.body ,['title','description','contentLink'])
    body.creator= req.user.userId
    const content = new Content(body)
    try{
        const savedContent = await content.save()
        await axios.post('http://localhost:4003/events',{
            type:'contentCreated',
            payload:savedContent
        })
        res.json(savedContent)
    }
    catch(err){
        res.status(500).json(err.message)
    }
}

contentCtlr.event = (req,res) => { 
    const {type}  = req.body
    console.log('event received in content service: ',type)
    res.json({})
}

module.exports = contentCtlr