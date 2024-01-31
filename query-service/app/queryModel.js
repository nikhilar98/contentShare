const {Schema,model} = require('mongoose')

const querySchema = new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        required:true
    },
    contents:{
        type:Array,
        required:true
    }
})

const Query = model('Query',querySchema)

module.exports = Query