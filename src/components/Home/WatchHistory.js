import { async } from '@firebase/util';
import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { channelonclickreducer } from '../../redux/reducers';
import Navbar from '../Bars/Navbar'
import Sidebar from '../Bars/Sidebar'

export default function WatchHistory ()
{
const emailselector= useSelector((state)=>state.reducer.email);
const loginselector=useSelector((state)=>state.reducer.login);
const [channell,setchannell]=useState()
const [isavailable,setisavailable]=useState(0)
const dispatch = useDispatch()


useEffect(()=>{
    function check(){
    if(loginselector.login===false){
      setchannell(false);
    }
    }
    check();
      },[loginselector.login])


    async function firebasee(){
        try{
        const  usersCollectionRef=await collection (db,'users')
        const po= await getDocs(usersCollectionRef);
        const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
        const userr=await userss.find((i)=>i.email==emailselector.email)
        console.log(userr)
        await console.log(userr.watchHistory)
         setchannell(userr);
        console.log(channell)
        }
        catch(err){
            console.log(err)
        }
    }
   
useEffect(()=>{
    firebasee()
},[isavailable])
   
      

  return (
   <>
   <Navbar/>
   <div className='largestdiv'>
    <Sidebar/>
<div className='subspageflex'>
    {
        loginselector.login==true ?
        channell ?
        channell.watchHistory &&
        channell.watchHistory.length>0?
           channell.watchHistory.map((i)=>{
return(

<div className='infopageflex'>
<div className='infopageflex2'>

    <img src={i.snippet.thumbnails.medium.url} className='thumbnaillikedvids'/>

    <Link to={`/${i.id.videoId}`} state={{itemm:i}} className='link'>
    <div className='channeltitlesubcount'>
  <p className='channeltitlelarge'>{ i.snippet.title}</p>
  <p className='subcountlarge'>{i.snippet.channelTitle}</p>
  <p className='subcountlarge'>
    { i.snippet.description.length>100 ?  i.snippet.description.slice(0,100)+'...'
:i.snippet.description  
} 
</p>
</div>
</Link>

   
<button className='subscribeButton' onClick={()=>{async function po(){
const po=  await updateDoc(doc(db,'users',channell.id),({watchHistory:arrayRemove(i)}))
await console.log(po);
await setisavailable((i)=>i+1);
} po()}}>Remove</button>

</div>

</div>
)
    })
    :
<p className='channeltitlelarge'>No watched Videos</p>
:
<p className='channeltitlelarge'>loading</p>
:
<p className='channeltitlelarge'>Please login to view watched videos</p>
// :
// <p className='channeltitlelarge'>Please login to view subscriptions</p>

}
</div>
   </div>
   </>
  )
}