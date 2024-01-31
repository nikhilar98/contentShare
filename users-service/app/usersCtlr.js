const _ = require('lodash')
const axios = require('axios')
require('dotenv').config()
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const User = require('./usersModel')
const usersCtlr ={} 

usersCtlr.register = async (req,res) => { 
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    try{
        const body = _.pick(req.body,['email','password'])
        const user = new User(body)
        const savedUser = await user.save()
        await axios.post('http://localhost:4003/events',{
            type:'userCreated',
            payload:savedUser._id
        })
        res.json({msg:'Registered successfully.'})
    }
    catch(err){ 
        res.status(500).json({msg:err.message})
    }
}

usersCtlr.login = async (req,res) => { 

    const errors = validationResult(req)

    if(!errors.isEmpty()){
       return res.status(400).json({errors:errors.array()})
    }

    try{
        const body = _.pick(req.body,['email','password'])
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(400).json({msg:"Invalid email / password."})
        }
        if(user.password==body.password){
            const token = jwt.sign({userId:user._id},process.env.SECRET_KEY)
            res.json({token:`bearer ${token}`})
        }
        else{
            return res.status(400).json({msg:"Invalid email / password."})
        }
    }
    catch(err){ 
        res.status(500).json(err.message)
    }
}

usersCtlr.event = (req,res) =>{  
    const {type}  = req.body
    console.log('event received in users service: ',type)
    res.json({})
}



module.exports = usersCtlr