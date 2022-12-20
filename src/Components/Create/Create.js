import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import {firebaseContext,AuthContext} from '../../Store/Context'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useNavigate} from 'react-router-dom';


import { collection, addDoc } from "firebase/firestore"; 
import app, { db } from '../../Firebase/Config';

const Create = () => {
  const {firebase} = useContext(firebaseContext);
  const {user} = useContext(AuthContext)
  const [name,setName] = useState('');
  const [category,setCategory] = useState('');
  const [price,setPrice] = useState('');
  const [image,setImage] = useState(null);
  const nameImage = {name}
  const navigate = useNavigate();
   const handleSubmit = async (e)=>{


    const storage = getStorage(app);
    const metadata = {
      contentType: 'image/jpeg'
    };
    
    const storageRef = ref(storage, `/images/${nameImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef,image, metadata);

    // Listen for state changes, errors, and completion of the upload.
uploadTask.on('state_changed',
(snapshot) => {
  const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
  console.log('Upload is ' + progress + '% done');
  document.getElementById('pogressId').innerHTML = `Upload is   ${progress} % done`
  
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  console.log(error);
  switch (error.code) {
    case 'storage/unauthorized':
      break;
    case 'storage/canceled':
      break;
    case 'storage/unknown':
      break;
  }
}, 
() => {
  let date = new Date();
  date = date.toDateString();
  getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
    console.log('File available at', downloadURL);
    
    const url = downloadURL;
    var ref = collection(db,'products')
    const docRef = await addDoc(
    ref,{
      name:name,
      price:price,
      category:category,
      imageurl:url,
      userId:user.uid,
      createdAAt:date.toString()
    }
    ).then(()=>{
      navigate('/')

    }).catch((error)=>{
    alert('unsuccessuful operation, error:'+error)
    })
    
  });
}
);


   }

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              value={category}
              onChange={(e)=>{setCategory(e.target.value)}}
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" 
            type="number" id="fname" 
            name="Price"
            value={price}
            onChange={(e)=>{setPrice(e.target.value)}}
             />
            <br />
          
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image):''} ></img>
        
            <br />
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
            <p id='pogressId' style={{color:'green'}}></p>
          
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
