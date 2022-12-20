import React,{useEffect,useState,useContext} from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";

import app, { db } from '../../Firebase/Config';

import './View.css';
import { PostContext } from '../../Store/PostContext';
import { firebaseContext } from '../../Store/Context';
function View() {
  const [userDetails,setUserDetails] = useState();
  const {postDetails} = useContext(PostContext);
  const {firebase}  = useContext(firebaseContext)
  useEffect(async()=>{
    console.log(postDetails.id);

    const q = query(collection(db, "users"), where("id", "==",postDetails.userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    setUserDetails(doc.data())
    });
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.imageurl}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price} </p>
          <span>{postDetails.name}</span>
          <p>{postDetails.category}</p>
          <span>{postDetails.createdAAt}</span>
        </div>
        {userDetails && 
                  <div className="contactDetails">
                  <p>Seller details</p>
                  
                  <p>{userDetails.username}</p>
                  <p>{userDetails.phone}</p>
                </div>
        }        
      </div>
    </div>
  );
}
export default View;
