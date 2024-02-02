import {Box, Button, TextField, Typography} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {sha256} from 'js-sha256'
import {isEmail,isStrongPassword} from 'validator'
import { ToastContainer, toast } from 'react-toastify';
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import { appContext } from '../App'


const UserForm = (props) =>{ 

    const {form} = props

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [formErrors,setFormErrors] = useState({})
    const [serverErrors,setServerErrors] = useState({})

    const {appDispatch} = useContext(appContext)

    const errors = {} 

    const notify = (msg) => toast.success(msg)  

    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {  
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
                    if(form=='register')
                    {
                        const response = await axios.post('https://contentshare-users-service.onrender.com/register',formData)
                        setEmail("")
                        setPassword("")
                        notify(response.data.msg)
                        setTimeout(()=>{
                            navigate('/login')
                        },2000)
                    }
                    else if(form=='login'){
                        const response = await axios.post('https://contentshare-users-service.onrender.com/login',formData)
                        localStorage.setItem('token',response.data.token)
                        const userContents = await axios.get('https://contentshare-query-service.onrender.com/myContents',{
                            headers:{
                                Authorization: localStorage.getItem('token')
                            }
                        })
                        appDispatch({type:'LOGIN_USER'})
                        appDispatch({type:"SET_USER_CONTENTS",payload:userContents.data})
                        navigate('/create')
                    }
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

    useEffect(()=>{
            setEmail("")
            setPassword("")
            setFormErrors({})
            setServerErrors({})
    },[])

    return (
            <Box sx={{display:'flex',justifyContent:'center',marginTop:'2vh'}}>
                <Box component='form' onSubmit={handleSubmit} 
                sx={{display:'grid',maxWidth:'220px',minWidth:'150px',rowGap:'2vh'}}>
                <Typography 
                variant="h3" 
                gutterBottom>
                     {form=='register' ? 'Register' : 'Login'}
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
                {serverErrors.generic && <p>{serverErrors.generic}</p>}
                <Button 
                type='submit'
                variant='contained'
                style={{width:'8rem'}}>
                    {form=='register' ? 'Register' : 'Login'}
                </Button>
                </Box>
                <ToastContainer autoClose={1500}/>
            </Box>
            )
    
}



export default UserForm