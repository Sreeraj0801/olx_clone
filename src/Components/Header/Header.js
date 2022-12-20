import React,{useContext} from 'react';
import { getAuth, signOut } from "firebase/auth";
import {useNavigate,Link} from 'react-router-dom';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, firebaseContext } from '../../Store/Context';

function Header() {
  const {user} = useContext(AuthContext);
  const {firebase} = useContext(firebaseContext)
  const navigate = useNavigate();

  
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span style={{cursor:'pointer'}}><Link  to={user ? `/create` : '/Login'}>
          {user ? user.email : 'Login'}
          </Link></span>
          <hr />
        </div>
        {user ? <span style={{cursor:'pointer'}} onClick={()=>{
          const auth = getAuth();
          signOut(auth).then(() => {
            navigate('/login')
          }).catch((error) => {
            alert("not sucessfull")
          });
        }}>Logout</span>: ''}
      
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span ><Link to={user ? `/create` : '/Login'}>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
