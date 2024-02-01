import {Route,Routes} from 'react-router-dom'
import ContentListing from './components/ContentListing'
import ContentForm from './components/ContentForm'
import ContentDisplay from './components/ContentDisplay'
import NavBar from './components/NavBar'
import UserForm from './components/UserForm'
const App = () => {
  return (
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
  );
}

export default App;
