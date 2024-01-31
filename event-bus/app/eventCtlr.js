const axios = require('axios') 
const Event = require('./eventModel')


const eventCtlr = {}  

eventCtlr.emit = async (req,res) => {  
    
    try{
        const event = new Event(req.body)
        await event.save()
        await axios.post('http://localhost:4000/events',event)
        await axios.post('http://localhost:4001/events',event)
        await axios.post('http://localhost:4002/events',event)
        res.status(201).json({})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = eventCtlr