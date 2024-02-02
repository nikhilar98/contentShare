const mongoose = require('mongoose')

const Query = require("./queryModel")

const queryCtlr ={} 



queryCtlr.getUserContents = async (req,res) => { 
   
    const {userId} = req.user
    try{
        const userRecord = await Query.findOne({creator:userId})
        res.json(userRecord.contents)
    }
    catch(err){
        res.status(500).json(err.message)
    }
    
}

queryCtlr.event = async (req,res) => { 

    const {type,payload} = req.body
    console.log('event received in query service:',type)
    try
    {
        if(type=='contentCreated'){
            const userId = payload.creator 
            await Query.findOneAndUpdate({creator:userId},{$push:{contents:payload}})
        }
        else if (type=='userCreated'){
            const newUser = { creator:payload,contents:[]}
            const userData = new Query(newUser) 
            await userData.save()
        }
        res.json({})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = queryCtlr