import { useContext, useState } from "react"
import { Box, Button, TextField, Typography } from "@mui/material"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import { appContext } from "../App"


const ContentForm = () => { 

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [link,setLink] = useState("")
    const [formErrors,setFormErrors] = useState({})
    const [serverErrors,setServerErrors] = useState({})
    
    const {appDispatch,appState}  = useContext(appContext)
    const {isLoggedin} = appState
    const navigate = useNavigate()

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
            setServerErrors({})
            const formData= { 
                title,
                description,
                contentLink:link
            }
            try{
                const response = await axios.post('https://contentshare-content-service.onrender.com/createContent',formData,{
                    headers:{
                        Authorization: localStorage.getItem('token')
                    }
                })
                appDispatch({type:"ADD_USER_CONTENT",payload:response.data})
                navigate('/myContents')
            }   
            catch(err){
                const errorResponse = err.response.data.errors
                const obj = {}
                errorResponse.forEach(ele=>{
                    obj[ele.path]=ele.msg
                })
                setServerErrors(obj)
            }
        }
        else{ 
            setFormErrors(errors)
        }
        
    }


    return (
        <>
        {isLoggedin ? 
            (<Box sx={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
            <Box
            component='form' 
            sx={{display:'grid',width:'40%',rowGap:'2vh'}}
            onSubmit={handeSubmit}>
                <Typography variant="h3" gutterBottom>Create content</Typography>
                <TextField 
                label="Title" 
                variant="standard"  
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}
                error={Boolean(formErrors.title) || Boolean(serverErrors.title)}
                helperText={(formErrors.title ? formErrors.title : '') || (serverErrors.title ? serverErrors.title : '')}/>

                <TextField 
                label='Description' 
                variant="standard"
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}
                error={Boolean(formErrors.description) || Boolean(serverErrors.description)}
                helperText={(formErrors.description ? formErrors.description : '') || (serverErrors.description ? serverErrors.description : '')}/>

                <TextField 
                label='Link' 
                variant="standard" 
                value={link}
                onChange={(e)=>{setLink(e.target.value)}}
                error={Boolean(formErrors.link) || Boolean(serverErrors.contentLink)}
                helperText={(formErrors.link ? formErrors.link : '') || (serverErrors.contentLink ? serverErrors.contentLink : '')}/>

                <Button
                variant='contained'
                type='submit'
                style={{width:'8rem'}}>
                    Create
                </Button>
            </Box>
        </Box>)

        : 

        (<Typography gutterBottom color="text.secondary">Login to create content.</Typography>)
        }
        </>
        
    )
}

export default ContentForm