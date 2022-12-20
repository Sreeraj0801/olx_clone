import React,{useState,useContext} from 'react';
import {useNavigate} from 'react-router-dom';

import Logo from '../../olx-logo.png';
import './Signup.css';

import { collection, addDoc } from "firebase/firestore"; 
import { firebaseContext } from '../../Store/Context';
import { getAuth, createUserWithEmailAndPassword  } from "firebase/auth";
import app, { db } from '../../Firebase/Config';


export default function Signup() {

  const navigate = useNavigate();

  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] = useState('');
  const {firebase} = useContext(firebaseContext);

  
  const handleSubmit = async(e)=>{
  e.preventDefault();
    const auth = getAuth(app);

      createUserWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          const user = userCredential.user;
          const docRef = await addDoc(collection(db, "users"), {
            id:user.uid,
            username: username,
            email: email,
            phone: phone
          }).then(()=>{
            navigate('/login')
          })

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
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <p style={{color:'red' ,width:'200px'}} id="errMsg"></p>
          <button>Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
