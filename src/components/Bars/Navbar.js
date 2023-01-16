import React, { useState,useEffect } from 'react'
import './Navbar.css';
import {RxHamburgerMenu} from 'react-icons/rx'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineVideoCameraAdd,AiFillCopyrightCircle} from 'react-icons/ai'
import {BsBell,BsThreeDotsVertical} from 'react-icons/bs'
import {BiUserCircle} from 'react-icons/bi'
import ytlogowhite from '../../photos/ytlogowhite.png'
import { Link } from 'react-router-dom';
import { addby } from '../../redux/reducers/index';
import { useDispatch, useSelector } from 'react-redux';
export default function Navbar() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [login,setlogin]=useState(false)
  const [query,setquery]=useState('')
  const [buttonClicked, setButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const reduxquery= useSelector((state)=>state.search);
  const iconstyle={
    height:'24px',
    width:'24px',
    color:'white',
    cursor:'pointer'
  }  

  const apikey1='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
const apikey2='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';

  
  return (
    <nav>
      <div className='start'>
<RxHamburgerMenu className='hamburgermenu' style={iconstyle}/>
<img src={ytlogowhite} className='ytlogo'/>
</div>

<div className='mid'>
<input type='text' placeholder='Search' className='searchbar' onChange={(e)=>{
  setquery(e.target.value)
  console.log(query)
}}/>
<Link onClick={()=>{
  dispatch(addby(query))
  console.log(reduxquery)
  }} 
  to={`/SearchPage/:${query}`} 
  style={{style:'none',textDecorationLine:'none',margin:'0'}} className='link'>
<button className='searchbutton'>
  <BsSearch style={{height:'19px',color:'white',width:'fit-content'}}/>
</button>
  </Link>
</div>

<div className='last'>
  {
    login?
    <div className='loggedindiv'>
<AiOutlineVideoCameraAdd style={iconstyle}/>
<BsBell style={iconstyle}/>
<AiFillCopyrightCircle style={iconstyle}/>
</div>
:
<>
<BsThreeDotsVertical style={{height:'19px',width:'auto',color:'white',cursor:'pointer'}}/>
<div className='signindiv'>
<BiUserCircle style={{height:'24px',width:'auto',color:' #3ea6ff',cursor:'pointer'}}/>
Sign in
</div>
</>
}
</div>
    </nav>
  )
}

