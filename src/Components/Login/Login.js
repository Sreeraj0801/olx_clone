import React,{useState,useContext} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from 'react-router-dom';


import {firebaseContext} from '../../Store/Context';
import Logo from '../../olx-logo.png';
import './Login.css';
import app, { db } from '../../Firebase/Config';


function Login() {
  const navigate = useNavigate();


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const {firebase} = useContext(firebaseContext);
  const handleSubmit = async(e)=>{
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
    const user = userCredential.user;
    navigate('/')

   })
    .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     const myArray = errorMessage.split(":");
     document.getElementById('errMsg').innerHTML = myArray[1];
   });
  
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <p style={{color:'red' ,width:'200px'}} id="errMsg"></p>
          <button >Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
