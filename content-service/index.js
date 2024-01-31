const express = require('express')
const cors = require('cors') 
const configDb = require('./configDb')
require('dotenv').config() 
const {checkSchema} = require('express-validator')
const contentCtlr = require('./app/ContentController')
const authenticateUser = require('./app/authenticateUser')
const contentValidationSchema = require('./app/contentSchema')
const app = express() 
app.use(cors())
app.use(express.json())
const port = process.env.PORT

configDb()

app.post('/createContent',authenticateUser,checkSchema(contentValidationSchema),contentCtlr.create)

app.post('/events',contentCtlr.event)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})