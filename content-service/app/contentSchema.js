const Content = require("./contentModel")

const contentValidationSchema = { 
    title:{ 
        notEmpty:{ 
            errorMessage:"Title cannot be Empty."
        },
        isLength:{ 
            options:{
                min:2
            },
            errorMessage:"Title should be atleast 2 character long"
        }
        
    },
    description: {
        notEmpty:{ 
            errorMessage:"Description cannot be Empty."
        },
        isLength:{ 
            options:{
                min:5
            },
            errorMessage:"Description should be atleast 5 characters long"
        }
    },
    contentLink:{ 
        notEmpty:{ 
            errorMessage:"Link cannot be Empty."
        },
        isURL:{ 
            errorMessage:"Invalid URL."
        },
        custom:{
            options: async function(value){ 
                const linkExists = await Content.aggregate([{$match:{contentLink:value}}])
                if(linkExists.length>0){
                    throw new Error("This Link is tagged to another content. Please provide another link")
                }
                return true
            }
        }
    }
}

module.exports = contentValidationSchema