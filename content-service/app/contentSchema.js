const Content = require("./contentModel")

const contentValidationSchema = { 
    
    contentLink:{ 
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