import { Box, Button, TextField } from "@mui/material"
import { useContext, useState } from "react"
import axios from 'axios'
import { appContext } from "../App"

const ContentForm = () => { 

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [link,setLink] = useState("")
    const [formErrors,setFormErrors] = useState({})
    const [serverErrors,setServerErrors] = useState({})
    
    const {appDispatch}  = useContext(appContext)

    const errors = {} 
    
    function runValidations(){
        if(title===''){
            errors.title = 'Title cannot be empty'
        }
        if(description===''){
            errors.description = 'description cannot be empty'
        }
        if(link===''){
            errors.link = 'Link cannot be empty'
        }
    }

    async function handeSubmit(e){
        e.preventDefault() 

        runValidations() 

        if(Object.keys(errors).length==0){
            setFormErrors({})
            const formData= { 
                title,
                description,
                contentLink:link
            }
            try{
                const response = await axios.post('http://localhost:4000/createContent',formData,{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                appDispatch({type:"ADD_USER_CONTENT",payload:response.data})
                //navigate user to the content
            }   
            catch(err){
                console.log(err)
                //handle the errors from server
            }
        }
        else{ 
            setFormErrors(errors)
        }
        
    }


    return (
        <Box sx={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
            <Box
            component='form' 
            sx={{display:'grid',width:'40%',rowGap:'2vh'}}
            onSubmit={handeSubmit}>
                <TextField 
                label="Title" 
                variant="standard"  
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                error={Boolean(formErrors.title) || Boolean(serverErrors.title)}
                helperText={(formErrors.title ? formErrors.title : '') || (serverErrors.title ? serverErrors.title : '')}/>

                <TextField 
                label='description' 
                variant="standard"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                error={Boolean(formErrors.description) || Boolean(serverErrors.description)}
                helperText={(formErrors.description ? formErrors.description : '') || (serverErrors.description ? serverErrors.description : '')}/>

                <TextField 
                label='link' 
                variant="standard" 
                value={link}
                onChange={(e)=>{setLink(e.target.value)}}
                error={Boolean(formErrors.link) || Boolean(serverErrors.link)}
                helperText={(formErrors.link ? formErrors.link : '') || (serverErrors.link ? serverErrors.link : '')}/>

                <Button
                variant='contained'
                type='submit'
                style={{width:'8rem'}}>
                    Create
                </Button>
            </Box>
        </Box>
    )
}

export default ContentForm