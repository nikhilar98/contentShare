import {Link} from 'react-router-dom'

const NavBar =()=>{ 

    return (
        <nav className='navBar'>
            <Link to='/' className='navLink'>Register</Link>
            <Link to='/login' className='navLink'>Login</Link>
            <Link to='/create' className='navLink'>Create</Link>
            <Link to='/myContents' className='navLink'>My contents</Link>
        </nav>
    )
}
export default NavBar