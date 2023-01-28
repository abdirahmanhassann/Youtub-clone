import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { db } from '../../firebase';
import { channelonclickreducer } from '../../redux/reducers';
import Navbar from '../Bars/Navbar'
import Sidebar from '../Bars/Sidebar'
export default function ()
{
const emailselector= useSelector((state)=>state.reducer.email);
const loginselector=useSelector((state)=>state.reducer.login);
const [channell,setchannell]=useState()
const dispatch = useDispatch()
let userr;

    async function firebasee(){
        
        const  usersCollectionRef=await collection (db,'users')
        const po= await getDocs(usersCollectionRef);
        const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
         userr=await userss.find((i)=>i.email==emailselector.email)
        await console.log(userr.subscriptions)
         setchannell(userr);
        console.log(channell)
    
    }
   
useEffect(()=>{
    firebasee()
    .then(console.log(channell))
},[])

  return (
   <>
   <Navbar/>
   <div className='largestdiv'>
    <Sidebar/>
<div className='subspageflex'>
    {
        channell ?
        channell.subscriptions.length>0?
    channell.subscriptions.map((i)=>{

        console.log(i);
return(

<div className='infopageflex'>
<div className='infopageflex2'>
    <img src={i.items[0].snippet.thumbnails.default.url} className='channelimg'/>

    <Link onClick={()=>{dispatch(channelonclickreducer(i))}}
to={`../ChannelPage/:${i.items[0].snippet.title}`} className='link'>
    <div className='channeltitlesubcount'>
  <p className='channeltitlelarge'>{ i.items[0].snippet.title}</p>
  <p className='subcountlarge'>{i.items[0].snippet.customUrl}</p>
  <p className='subcountlarge'>{ i.items[0].snippet.description.length>100 ?  i.items[0].snippet.description.slice(0,100)+'...'
:i.items[0].snippet.description  
}</p>
</div>
</Link>
</div>
</div>
)
    })
    :
<p className='channeltitlelarge'>No subscriptions</p>
:
<p className='channeltitlelarge'>loading</p>
// :
// <p className='channeltitlelarge'>Please login to view subscriptions</p>

}
</div>
   </div>
   </>
  )
}