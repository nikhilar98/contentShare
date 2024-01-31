const {Schema,model} = require('mongoose')

const eventSchema = new Schema({ 
    type:{
        type:String,
        required:true
    },
    payload:{
        type:Object,
        required:true
    }
})

const Event = model('Event',eventSchema)

module.exports = Event