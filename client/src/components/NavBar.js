import {Link} from 'react-router-dom'

const NavBar =()=>{ 

    return (
        <nav>
            <Link to='/'>Register</Link>
            <Link to='/login'>Login</Link>
            <Link to='/create'>Create</Link>
            <Link to='/myContents'>My contents</Link>
        </nav>
    )
}
export default NavBar