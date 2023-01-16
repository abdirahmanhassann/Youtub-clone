import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Navbar from '../Bars/Navbar';
import './SearchPage.css'
import { addby } from '../../redux/reducers/index';
import { useDispatch } from 'react-redux';
export default function SearchPage() {
    const location=useLocation();
const [item,setitem]= useState();
const [error,setError]=useState()
const dispatch= useDispatch()
const selector= useSelector(state=>state.search);
const apikey2='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
const apikey1='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';
 console.log(location.pathname.slice(13))
useEffect(()=>{
    try {
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selector}&maxResults=25&type=video&key=${apikey1}`)
   .then(res=>res.json())  
.then(res=>{
 setitem(res);
console.log(selector)
console.log(item);
})
    
    } catch (error) {
      setError(error);
    }
},[ , selector])


// useEffect(()=>{
//     try {
//       fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selector}&maxResults=25&type=video&key=${apikey1}`)
//    .then(res=>res.json())  
// .then(res=>{
//  setitem(res);
// console.log(selector)

// })
        
//     } catch (error) {
//       setError(error);
//     }
// },[selector])

  return (
    <>
        <Navbar/>
 <div style={{paddingTop:'100px'}}>
      { 
      item ? item.items.map((itemm)=>{
    return(
        <p>{itemm.snippet.title}</p>
    ) 
    })
  :
  <p>search results loading</p>
  }
  </div>
    </>
  )
}
