import {Route,Routes} from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import ContentListing from './components/ContentListing'
import ContentForm from './components/ContentForm'
import ContentDisplay from './components/ContentDisplay'
import NavBar from './components/NavBar'
const App = () => {
  return (
    <div>
      <header>
        <NavBar/>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<RegisterForm/>}></Route>
          <Route path='/login' element={<LoginForm/>}></Route>
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
