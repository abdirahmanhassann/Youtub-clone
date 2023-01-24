import React, { useState,useEffect, useRef } from 'react'
import './Navbar.css';
import {RxHamburgerMenu} from 'react-icons/rx'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineVideoCameraAdd,AiFillCopyrightCircle} from 'react-icons/ai'
import {BsBell,BsThreeDotsVertical} from 'react-icons/bs'
import {BiUserCircle, BiArrowBack} from 'react-icons/bi'
import ytlogowhite from '../../photos/ytlogowhite.png'
import { Link } from 'react-router-dom';
import { accountreducer, addby, emailreducer } from '../../redux/reducers/index';
import {loginslicereducer} from '../../redux/reducers/index';
import { useDispatch, useSelector } from 'react-redux';
import { auth, db, prov } from '../../firebase';
import { handleSignIn } from '../../youtubechanel';
import { signInWithPopup } from 'firebase/auth';
import {VscAccount} from 'react-icons/vsc'
import 'firebase/firestore';
import firebase from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import Drawer from 'react-modern-drawer'
export default function Navbar() {
  const [response, setResponse] = useState(null);
  const [userinfo, setuserinfo] = useState();
  const [login,setlogin]=useState(false)
  const [query,setquery]=useState('')
  const [buttonClicked, setButtonClicked] = useState(false);
const [searchbar,setsearchbar]=useState(true);
  const dispatch = useDispatch();
  const loginselector=useSelector(state=>state.reducer.login)
  const reduxquery= useSelector((state)=>state.search);
  const accountselector=useSelector(state=>state.reducer.account);
  const emailselector=useSelector(state=>state.reducer.email);
  
  const [isclicked,setisclicked]=useState(false);

  const toggleDrawer = () => {
    setisclicked((prevState) => !prevState)
}
useEffect(()=>{
  document.addEventListener('click',outsideclick,true)
},[isclicked])

  const refOne= useRef(null);
  const outsideclick=(e)=>{
    if(!refOne.current.contains(e.target))
    {
  setisclicked(false)
    }
    else
    {
  return null;
    }
  }
  const iconstyle={
    height:'21px',
    width:'21px',
    color:'white',
    cursor:'pointer'
  }  

  const apikey1='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
const apikey2='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';


// useEffect(()=>
// {
//     async function signindiv(){

//  const  signin= ()=>{
//   signInWithPopup(auth, prov).then((res)=>{
//     dispatch(accountreducer(res.user.photoURL))
//     console.log(accountselector)
//     //dispatch(accountreducer(res))
//   }).catch((err)=>{
//     console.log(err)
//   })
// }
// await dispatch(loginslicereducer(true))
//  await signin();
//  await dispatch(loginslicereducer(true))
// }
// }
// signgz
// )


 return (
    <nav>
  {searchbar &&
      <div className='start'>
 <RxHamburgerMenu className='hamburgermenu' onClick={toggleDrawer}>
 </RxHamburgerMenu>
 {isclicked &&
 <div className='drawer' ref={refOne} >
  
 </div>
}
<Link to='/' >
<img src={ytlogowhite} className='ytlogo' />
</Link>
</div>
}

<div className='mid' >
<input type='text' placeholder='Search' className='searchbar' onChange={(e)=>{
  setquery(e.target.value)
  console.log(query)
}}
onKeyPress={(event)=>{
    if (event.key === 'Enter') {

  <Link onClick={()=>{
    dispatch(addby(query))
    console.log(reduxquery)
  }} 
  to={`/SearchPage/:${query}`}
  style={{style:'none',textDecorationLine:'none',margin:'0'}} className='link'

  ></Link>

}}}
/>
<Link onClick={()=>{
      dispatch(addby(query))
      console.log(reduxquery)
    }} 
    to={`/SearchPage/:${query}`}
      style={{style:'none',textDecorationLine:'none',margin:'0'}} className='link'
    
      >
    
        <button className='searchbutton'  >
  <BsSearch style={{height:'19px',color:'white',width:'fit-content'}}/>
</button>

      </Link>
</div>
{ searchbar ?
<div className='mid2'  onClick={()=>setsearchbar(false)}>
  <BsSearch style={{height:'19px',color:'white',width:'fit-content'}}/>
</div>
:
<div className='mid3' >

  <BiArrowBack style={{height:'32px',color:'white',width:'fit-content',marginRight:'15px'}}  onClick={()=>setsearchbar(true)}/>

<input type='text' placeholder='Search' className='searchbar' onChange={(e)=>{
  setquery(e.target.value)
  console.log(query)
}}
onKeyPress={(event)=>{
    if (event.key === 'Enter') {

  <Link onClick={()=>{
    dispatch(addby(query))
    console.log(reduxquery)
  }} 
  to={`/SearchPage/:${query}`}
  style={{style:'none',textDecorationLine:'none',margin:'0'}} className='link'

  ></Link>

}}}
/>
<Link onClick={()=>{
      dispatch(addby(query))
      console.log(reduxquery)
    }} 
    to={`/SearchPage/:${query}`}
      style={{style:'none',textDecorationLine:'none',margin:'0'}} className='link'
    
      >
    
        <button className='searchbutton'  >
  <BsSearch style={{height:'19px',color:'white',width:'fit-content'}}/>
</button>

      </Link>
</div>
}

{searchbar &&
<div className='last' >
  {
    loginselector.login==true ?
    <div className='loggedindiv'>
<AiOutlineVideoCameraAdd style={iconstyle}/>
<BsBell style={iconstyle}/>
<img src={accountselector.account} style={{height:'35px',cursor:'pointer',borderRadius:'19px'}} onClick={()=>{

dispatch(accountreducer(null))
dispatch(loginslicereducer(false))
dispatch(emailreducer(null))
}}/>
</div>
:
<>
<BsThreeDotsVertical style={{height:'19px',width:'auto',color:'white',cursor:'pointer'}}/>
<div className='signindiv'onClick={()=>{
    signInWithPopup(auth, prov).then((res)=>{
      dispatch(accountreducer(res.user.photoURL))
  setuserinfo(res.user.email)
      dispatch(loginslicereducer(true))
      dispatch(emailreducer(res.user.email))
      console.log(emailselector)
      //console.log(res.user.email)
      
      async function database(res){
      const  usersCollectionRef=collection (db,'users')
     const po=  await getDocs(usersCollectionRef)
     const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
   await  console.log(userss);
   const check= userss.find(i=>i.email==res.user.email)
     if (check) {
     
       console.log('already exists')
       console.log(check, res.user.email)
       return null;
      
    }
    else { 
      addDoc(usersCollectionRef,{
        email: res.user.email,
        name: res.user.displayName,
        photoURL: res.user.photoURL
      })
      console.log('ggg')
    }
    await console.log(res.user.email)
  } 
    database(res)

      //dispatch(accountreducer(res))
   
  
    .catch((err)=>{
      console.log(err)
    })})
}}>
<VscAccount style={{height:'20px',width:'auto',color:' #3ea6ff',cursor:'pointer'}} />
Sign in
</div>
</>
}
</div>
}
    </nav>
  )
}

