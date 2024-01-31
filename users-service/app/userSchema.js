const User = require("./usersModel")

const passwordSchema = { 
    notEmpty:{
        errorMessage:"Password is required."
    }
} 

const emailSchema = { 
    notEmpty:{
        errorMessage:"Email is required."
    },
    isEmail:{ 
        errorMessage:"invalid email."
    }
}


const userRegistrationSchema = { 
    email:{ 
        ...emailSchema,
        custom:{
            options: async (value)=> {
                const userExists = await User.aggregate([{$match:{email:value}}])
                if(!userExists.length==0){
                    throw new Error('Email already registered.')
                }
                return true
            }
        }
    },
    password:passwordSchema
}   


const userloginSchema = { 
    email:emailSchema,
    password:passwordSchema
}


module.exports = {userloginSchema,userRegistrationSchema}