import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { channelonclickreducer } from '../../redux/reducers';
import Navbar from '../Bars/Navbar'
import Sidebar from '../Bars/Sidebar'

export default function LikedVids ()
{
const emailselector= useSelector((state)=>state.reducer.email);
const loginselector=useSelector((state)=>state.reducer.login);
const [channell,setchannell]=useState()
const dispatch = useDispatch()

// useEffect(()=>{
//     function check(){
//     if(loginselector.login===false){
//       setchannell(false);
//     }
//     }
//     check();
//       },[loginselector.login])
    
    async function firebasee(){
        try{
        const  usersCollectionRef=await collection (db,'users')
        const po= await getDocs(usersCollectionRef);
        const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
        const userr=await userss.find((i)=>i.email==emailselector.email)
        await console.log(userr.likedvideos)
         setchannell(userr);
        console.log(channell)
        }
        catch(err){
            console.log(err)
        }
    }
   
useEffect(()=>{
    firebasee()
},[])

  return (
   <>
   <Navbar/>
   <div className='largestdiv'>
    <Sidebar/>
<div className='subspageflex'>
    {
        loginselector.login ==true?

        channell ?
        channell.likedvideos?
    channell.likedvideos.map((i)=>{

        console.log(i);
return(

<div className='infopageflex'>
<div className='infopageflex2'>
    <img src={i.snippet.thumbnails.medium.url} className='thumbnaillikedvids'/>

    <Link to={`/${i.id.videoId}`} state={{itemm:i}} className='link'>
    <div className='channeltitlesubcount'>
  <p className='channeltitlelarge'>{ i.snippet.title}</p>
  <p className='subcountlarge'>{i.snippet.channelTitle}</p>
  <p className='subcountlarge'>{ i.snippet.description.length>100 ?  i.snippet.description.slice(0,100)+'...'
:i.snippet.description  
}</p>
</div>
</Link>
</div>
</div>
)
    })
    :
<p className='channeltitlelarge'>No Liked Videos</p>
:
<p className='channeltitlelarge'>loading</p>
:
<p className='channeltitlelarge'>Please login to view Liked videos</p>

}
</div>
   </div>
   </>
  )
}