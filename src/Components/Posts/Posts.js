import React,{useState, useEffect,useContext} from 'react';
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from '../../Firebase/Config';
import Heart from '../../assets/Heart';
import './Post.css';
import { firebaseContext } from '../../Store/Context';
import { PostContext } from '../../Store/PostContext';
import {useNavigate} from 'react-router-dom';

function Posts() {
  const navigate = useNavigate();

  let proArray = [];
  
  const {firebase} = useContext(firebaseContext)
  const [products,setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)

    useEffect(async()=>{  
    const querySnapshot = await getDocs(collection(db, "products"))
    querySnapshot.forEach((doc) => {
      let details = {
        id:doc.id,
        ...doc.data()
      }
       proArray.push(details);
       
})
setProducts(proArray)
  },[])

  return (

    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
            {
              products.map((product)=>{
                return(
                  <div
                  className="card"
                  onClick={()=>{
                    setPostDetails(product)
                    navigate('/viewpost')
                  }}
                >
                  <div className="favorite">
                    <Heart></Heart>
                  </div>
                  <div className="image">
                    <img src={product.imageurl} alt="" />
                  </div>
                  <div className="content">
                    <p className="rate">&#x20B9; {product.price}</p>
                    <span className="kilometer">{product.name}</span>
                    <p className="name">{product.category}</p>
                  </div>
                  <div className="date">
                    <span>{product.createdAAt}</span>
                  </div>
                </div>
                )
              })
            }
        </div>
      </div>
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
        {        
        products.map((product)=>{
          return(
            <div className="card">
            <div className="favorite">
              <Heart></Heart>
            </div>
            <div className="image">
              <img src={product.imageurl} alt="" />
            </div>
            <div className="content">
              <p className="rate">&#x20B9; {product.price}</p>
              <span className="kilometer">{product.name}</span>
              <p className="name">{product.category}</p>
            </div>
            <div className="date">
              <span>{product.createdAAt}</span>
            </div>
          </div>
          )
        })}
        </div>
      </div>
    </div>
  );
}

export default Posts;
