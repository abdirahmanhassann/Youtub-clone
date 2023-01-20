import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import Navbar from '../Bars/Navbar';
import './SearchPage.css'
import { addby } from '../../redux/reducers/index';
import { useDispatch } from 'react-redux';
import TimeAgo from 'react-timeago';
import Sidebar from '../Bars/Sidebar'
import { Link } from 'react-router-dom';

export default function SearchPage() {
    const location=useLocation();
const [item,setitem]= useState();
const [error,setError]=useState()
const [clicked,setclicked]=useState();
const dispatch= useDispatch()
const selector= useSelector(state=>state.search);
const apikey2='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
const apikey1='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';
 console.log(location.pathname.slice(13))
useEffect(()=>{
    try {
      window.scrollTo(0, 0);
      fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selector.search}&maxResults=25&type=video&key=${apikey1}`)
   .then(res=>res.json())  
.then(res=>{
 setitem(res);
console.log(selector.search)
console.log(item);
})
    
    } catch (error) {
      setError(error);
    }
},[ , selector])


  return (
    <>
        <Navbar/>
 <div className='largestdiv2'>
    <Sidebar left={'0px'} position={'fixed'}/>
 <div className='largediv2'>

      { 
      item ? item.items.map((itemm)=>{
    return(

        <Link to={`/${itemm.id.videoId}`} state={{itemm:itemm}} className='link2'>
        <div key={itemm.id.videoId} className='suggestedvids2' onClick={()=>
            {        setclicked(itemm)
                console.log(clicked)
            window.scrollTo(0, 0);
                    }
                    }>
                      <img src={itemm.snippet.thumbnails.high.url} alt={itemm.snippet.title} className='thumbnails2' />
                      <div className= 'subsuggestedvids2'>
                      
                      <h2 className='videoheadeer2'>{itemm.snippet.title}</h2>

                    <TimeAgo date={itemm.snippet.publishedAt} locale="en" className='subcount3' />
                    <p className='subcount3'>{itemm.snippet.channelTitle}</p>
                      </div>
                    </div>
                    </Link>
    ) 
    })
  :
  <p style={{height:'100%'}}>search results loading</p>
  }
  </div>
  </div>
    </>
  )
}
