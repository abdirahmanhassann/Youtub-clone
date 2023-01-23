import React, { useState,useEffect } from 'react'
import './Navbar.css';
import {RxHamburgerMenu} from 'react-icons/rx'
import {BsSearch} from 'react-icons/bs'
import {AiOutlineVideoCameraAdd,AiFillCopyrightCircle} from 'react-icons/ai'
import {BsBell,BsThreeDotsVertical} from 'react-icons/bs'
import {BiUserCircle, BiArrowBack} from 'react-icons/bi'
import ytlogowhite from '../../photos/ytlogowhite.png'
import { Link } from 'react-router-dom';
import { accountreducer, addby } from '../../redux/reducers/index';
import {loginslicereducer} from '../../redux/reducers/index';
import { useDispatch, useSelector } from 'react-redux';
import { auth, prov } from '../../firebase';
import { handleSignIn } from '../../youtubechanel';
import { signInWithPopup } from 'firebase/auth';
import {VscAccount} from 'react-icons/vsc'
export default function Navbar() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [login,setlogin]=useState(false)
  const [query,setquery]=useState('')
  const [buttonClicked, setButtonClicked] = useState(false);
const [searchbar,setsearchbar]=useState(true);
  const dispatch = useDispatch();
  const loginselector=useSelector(state=>state.reducer.login)
  const reduxquery= useSelector((state)=>state.search);
  const accountselector=useSelector(state=>state.reducer.account);
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
<RxHamburgerMenu className='hamburgermenu' style={iconstyle}/>
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
<div className='mid2' onClick={()=>setsearchbar(false)}>
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
}}/>
</div>
:
<>
<BsThreeDotsVertical style={{height:'19px',width:'auto',color:'white',cursor:'pointer'}}/>
<div className='signindiv'onClick={()=>{
    signInWithPopup(auth, prov).then((res)=>{
      dispatch(accountreducer(res.user.photoURL))
      dispatch(loginslicereducer(true))

      console.log(accountselector)
      //dispatch(accountreducer(res))
    }).catch((err)=>{
      console.log(err)
    })

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

