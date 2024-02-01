import {Box, Button, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import axios from 'axios'
import {sha256} from 'js-sha256'
import {isEmail,isStrongPassword} from 'validator'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

const RegisterForm = () => { 

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [formErrors,setFormErrors] = useState({})
    const [serverErrors,setServerErrors] = useState({})

    const errors = {} 

    function runValidations() { 
        if(email===''){
            errors.email = 'email is required.'
        }
        else if(!isEmail(email)){
            errors.email = 'Invalid email.'
        }
        if(password==''){
            errors.password = 'password is required.'
        }
        else if(!isStrongPassword(password)){
            errors.password = 'Invalid password. (requires min 8 chars, 1 lowercase letter, 1 uppercase letter, 1 number & 1 special character)'
        }
    }

    const handleRegister = async (e) =>{  
        e.preventDefault() 

        runValidations()

        if(Object.keys(errors).length==0){   //if errors object is empty, proceed to making the api call
            setFormErrors({})
            setServerErrors({})
            const formData= { 
                email,
                password:sha256(password)
            }
            try{
                const response = await axios.post('http://localhost:4001/register',formData)
                setEmail("")
                setPassword("")
                notify(response.data.msg)
                setTimeout(()=>{
                    navigate('/login')
                },2000)
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

    const notify = (msg) => toast.success(msg)
    const navigate = useNavigate()

    return (
        <Box sx={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
             <Box component='form' onSubmit={handleRegister} sx={{display:'grid',maxWidth:'20%',rowGap:'2vh'}}>
                <Typography 
                variant="h3" 
                gutterBottom>
                    Register
                </Typography>
                <TextField 
                label="Email" 
                variant="outlined" 
                value={email} 
                onChange={(e)=>{setEmail(e.target.value)}}
                error={Boolean(formErrors.email) || Boolean(serverErrors.email)}
                helperText={(formErrors.email ? formErrors.email : '') || (serverErrors.email ? serverErrors.email : '')}>
                </TextField>
                <TextField 
                label="password" 
                variant="outlined" 
                type='password'
                value={password} 
                onChange={(e)=>{setPassword(e.target.value)}}
                error={Boolean(formErrors.password)|| Boolean(serverErrors.password)}
                helperText={(formErrors.password ? formErrors.password : '') || (serverErrors.password ? serverErrors.password : '')}>
                </TextField>
                <Button 
                type='submit'
                variant='contained'
                style={{width:'8rem'}}>
                    Register
                </Button>
             </Box>
             <ToastContainer autoClose={1500}/>
        </Box>
    )
}

export default RegisterForm