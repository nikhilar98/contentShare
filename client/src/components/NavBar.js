import { useContext } from 'react'
import {Link} from 'react-router-dom'

import { appContext } from '../App'

const NavBar =()=>{ 

    const {appState,appDispatch} = useContext(appContext) 

    const {isLoggedin} = appState

    function handleLogout(){
        appDispatch({type:"LOGOUT_USER"})
        localStorage.removeItem('token')
    }   

    return (
        <nav className='navBar'>
            {
                isLoggedin ? 

                <>
                    <Link to='/' className='navLink' onClick={handleLogout}>Logout</Link>
                    <Link to='/create' className='navLink'>Create</Link>
                    <Link to='/myContents' className='navLink'>My contents</Link>
                </>

                :

                <>
                <Link to='/' className='navLink'>Register</Link>
                <Link to='/login' className='navLink'>Login</Link>
                </>

            }
        </nav>
    )
}
export default NavBar