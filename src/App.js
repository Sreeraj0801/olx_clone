import React ,{useEffect,useContext} from 'react';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { AuthContext,firebaseContext } from './Store/Context';
import app from './Firebase/Config';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Post from './Store/PostContext';

function App() {
  const auth = getAuth(app);

  const {user,setUser} = useContext(AuthContext)
  const {firebase} = useContext(firebaseContext) 
  useEffect(()=>{
      onAuthStateChanged(auth, user => {
      setUser(user);
      })
  })
  return (
    <div>
      <Post>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/create' element={<Create />}/>
        <Route path='/viewPost' element={<ViewPost />}/>
      </Routes>
      </Post>
    </div>
  );
}

export default App;
