import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

const ContentForm = () => { 

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [link,setLink] = useState("")

    const errors = {} 
    
    function handeSubmit(e){
        e.preventDefault() 

        const formData= { 
            title,
            description,
            link
        }

        try{

        }
        catch(err){

        }
    }


    return (
        <Box sx={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
            <Box
            component='form' 
            sx={{display:'grid',maxWidth:'40%',rowGap:'2vh'}}
            onSubmit={handeSubmit}>
                <TextField 
                label="Title" 
                variant="standard"  
                value={title}
                onChange={(e)=>{setTitle(e.target.value)}}/>

                <label 
                htmlFor="description">
                    Description
                </label>

                <textarea 
                rows='5' 
                cols='80' 
                id='description' 
                value={description}
                onChange={(e)=>{setDescription(e.target.value)}}>
                </textarea>

                <TextField 
                label='link' 
                variant="standard" 
                value={link}
                onChange={(e)=>{setLink(e.target.value)}}/>

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