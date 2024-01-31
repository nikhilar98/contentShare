const { config } = require("dotenv")
const mongoose = require('mongoose')


const configDb = async () => { 

    const url = process.env.DB_URL 
    const name = process.env.DB_NAME
    try{
        await mongoose.connect(`${url}/${name}`)
        console.log('Connected with database.')
    }
    catch(err){
        console.log('Error connecting to database : ',err)
    }
}

module.exports = configDb   