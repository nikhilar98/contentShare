const express = require('express')
const cors = require('cors')
const queryCtlr = require('./app/queryCtlr')
const authenticateUser = require('./app/authenticateUser')
const configDb = require('./configDb')
require('dotenv').config()

const app = express() 
const port = process.env.PORT

app.use(express.json())
app.use(cors())
configDb()

app.get('/myContents',authenticateUser,queryCtlr.getUserContents)

app.post('/events',queryCtlr.event)

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})