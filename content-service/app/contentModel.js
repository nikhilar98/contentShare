const {Schema,model} = require('mongoose')

const contentSchema = new Schema({ 
    title:{
        type:String, 
        required:true
    },
    description: { 
        type:String,
        required:true 
    },
    contentLink:{ 
        type:String,
        required:true 
    },
    creator:{
        type:Schema.Types.ObjectId,
        required:true
    }
})

const Content = model('Content',contentSchema)

module.exports = Content