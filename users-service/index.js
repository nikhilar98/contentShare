const express = require('express')
const cors = require('cors') 
const configDb = require('./configDb')
require('dotenv').config() 
const {checkSchema} = require('express-validator')
const usersCtlr = require('./app/usersCtlr')
const {userRegistrationSchema,userloginSchema} = require('./app/userSchema')

const app = express() 
app.use(cors())
app.use(express.json())
const port = process.env.PORT

configDb()

app.post('/register',checkSchema(userRegistrationSchema),usersCtlr.register)

app.post('/login',checkSchema(userloginSchema),usersCtlr.login)

app.post('/events',usersCtlr.event)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}.`)
})