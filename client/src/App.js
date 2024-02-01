import {Route,Routes} from 'react-router-dom'
import ContentListing from './components/ContentListing'
import ContentForm from './components/ContentForm'
import ContentDisplay from './components/ContentDisplay'
import NavBar from './components/NavBar'
import UserForm from './components/UserForm'
import { createContext, useEffect, useReducer } from 'react'
import appReducer from './reducers/appReducer'
import axios from 'axios'

export const appContext = createContext() 

const App = () => {

  const [appState,appDispatch] = useReducer(appReducer,{isLoggedin:false,userContents:[]})

  useEffect(()=>{ 
    (async function(){
      if(localStorage.getItem('token')){
        appDispatch({type:'LOGIN_USER'})
        const userContents = await axios.get('http://localhost:4002/myContents',{
          headers:{
              Authorization: localStorage.getItem('token')
          }
        })
        appDispatch({type:"SET_USER_CONTENTS",payload:userContents.data})
      }
    })()
  },[])

  console.log('app state:',appState)

  return (
    <appContext.Provider value={{appState,appDispatch}}>
      <div>
        <header>
          <NavBar/>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<UserForm form='register'/>}></Route>
            <Route path='/login' element={<UserForm form='login'/>}></Route>
            <Route path='/myContents' element={<ContentListing/>}></Route>
            <Route path='/create' element={<ContentForm/>}></Route>
            <Route path='/content/:id' element={<ContentDisplay/>}></Route>
          </Routes>
        </main>
        <footer></footer>
      </div>
    </appContext.Provider>
  );
}

export {App}
