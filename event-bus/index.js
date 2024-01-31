const express = require('express')
const configDb = require('./configDb')
const eventCtlr = require('./app/eventCtlr')
const app = express() 

app.use(express.json())

const port = process.env.PORT

configDb()

app.post('/events',eventCtlr.emit)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})