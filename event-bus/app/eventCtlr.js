const axios = require('axios') 
const Event = require('./eventModel')


const eventCtlr = {}  

eventCtlr.emit = async (req,res) => {  
    
    try{
        const event = new Event(req.body)
        await event.save()
        await axios.post('https://contentshare-content-service.onrender.com/events',event)
        await axios.post('https://contentshare-users-service.onrender.com/events',event)
        await axios.post('https://contentshare-query-service.onrender.com/events',event)
        res.status(201).json({})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = eventCtlr