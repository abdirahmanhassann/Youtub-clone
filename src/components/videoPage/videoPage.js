import React, { useEffect, useRef, useState } from 'react'
import './videoPage.css'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../Bars/Navbar';
import { useLocation } from 'react-router';
import  YouTube from 'react-youtube';
import {AiFillDislike, AiFillLike, AiOutlineLike} from 'react-icons/ai'
import {AiOutlineDislike} from 'react-icons/ai'
import {RiShareForwardLine} from 'react-icons/ri'
import {BsThreeDots} from 'react-icons/bs'
import {MdOutlineDownloadForOffline} from 'react-icons/md'
import { NumericFormat } from 'react-number-format';
import TimeAgo from 'react-timeago';
import ytlogo from '../../photos/ytlogo.png'
import signedoutprofilepic from '../../photos/ytprofilepic.jpg'
import { Link } from 'react-router-dom';
import { channelonclickreducer } from '../../redux/reducers/index';
import { db } from '../../firebase';
import { arrayRemove, arrayUnion, collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { async } from '@firebase/util';
export default function VideoPage(props) {
  const location=useLocation();
  const [channelData,setChannelData]=useState();
  const [channelstats,setChannelstats]=useState();
  const [videostats,setvideostats]=useState();
  const [showdesc,setshowdesc]=useState(false);
  const [comments,setcomments]=useState();
  const [makeAComment,setmakeAComment]=useState()
  const [suggestedVideos, setSuggestedVideos] = useState();
  const [itemz,setitemz]=useState(location.state.item);
  const[item,setitem]=useState(location.state.itemm)
  const [bool,setbool]=useState(false);
  const [downloadbutton,setdownloadbutton]=useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedquality, setSelectedquality] = useState('');
  const [downloadapi,setdownloadapi]=useState();
  const [buttonclicked, setbuttonclicked]=useState(false)
  const loginselector = useSelector((state)=>state.reducer.login);
  const emailselector= useSelector((state)=>state.reducer.email);
  const [channelstate,setchannelstate]=useState()
  const [subscribestate,setsubscribestate]=useState(false);
  const [likestate,setlikestate]=useState(null);
  const [dislikestate,setdislikestate]=useState(false);
   const refOne= useRef(null)
  const apikey2='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
  //const apikey1='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';
  //const apikey2 = 'AIzaSyCl1-mrm4K1XDfs3IGQOkYmyyzSTh3FQas';

  const dispatch=useDispatch();
  function onPlayerReady(event) {
    event.target.playVideo();

  }
  async function firebasee(response){
         
                

    const  usersCollectionRef=await collection (db,'users')
    const po= await getDocs(usersCollectionRef);
  await  console.log(po)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    const userr= await userss.find((i)=>i.email==emailselector.email)
  await  console.log(userr);
  await console.log(response)
  await console.log(response.items[0].id)
 await console.log(userr)
  if(userr && userr.subscriptions.length>0)
  {
const individual= await userr.subscriptions.find((i)=>i.items[0].id==response.items[0].id)
await console.log(individual)
await setchannelstate(individual)
await console.log(channelstate)
if(await individual==undefined){
setsubscribestate(false)
}
else{
setsubscribestate(true)
}}
else{
setsubscribestate(false)
}

 } 

  async function likechecker(){
         
                

    const  usersCollectionRef=await collection (db,'users')
    const po= await getDocs(usersCollectionRef);
  await  console.log(po)
    const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
    const userr= await userss.find((i)=>i.email==emailselector.email)
  await  console.log(userr);
const individual= await userr.likedvideos.find((i)=>i.id.videoId==item.id.videoId);

const individual2= await userr.dislikedvideos.find((i)=>i.id.videoId==item.id.videoId)

await console.log(individual);
//await console.log(item);
if(await individual==undefined){
setlikestate(false)
}
else{
setlikestate(true)
setdislikestate(false);
}

if(await individual2==undefined){
  setdislikestate(false)
}
else{
  setdislikestate(true);
  setlikestate(false);
}
}


 useEffect(()=>{
likechecker(item);
 },[bool])

  
useEffect(()=>{
  fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${ item ?item.snippet.channelId : itemz.snippet.channelId}&key=${apikey2}`)
  
  .then(response => response.json())
  .then(response => {
    setChannelData(response); 
    console.log(channelData)
    firebasee(response);    
  })
fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${ item ?item.snippet.channelId : itemz.snippet.channelId}&key=${apikey2}`)
.then(res => res.json())
.then(res => {
setChannelstats(res);
console.log(channelstats)
})
fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ item ?item.id.videoId : itemz.id}&key=${apikey2}`)
.then(r=>r.json())
.then(r=>{
  setvideostats(r)
  console.log(videostats)
})

fetch(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${item ?item.id.videoId : itemz.id}&key=${apikey2}`)
.then(r=>r.json())
.then(r=>{
  setcomments(r);
  console.log(r)
})

fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${item ?item.id.videoId : itemz.id}&type=video&maxResults=20&key=${apikey2}`)
  .then((r) => r.json())
  .then((r) =>{ 
    setSuggestedVideos(r)
  console.log(r)
  });

},[bool]);


const handleChange = (event) => {
  setSelectedOption(event.target.value);
}

useEffect(() => {
  if (!selectedOption) return;
  if (selectedOption === 'option1') {
    setSelectedquality('option1');
  } else if (selectedOption === 'option2') {
    setSelectedquality('option2');
  } else if (selectedOption === 'option3') {
    setSelectedquality('option3');
  } else {
    setSelectedquality(null);
  }
}, [selectedOption]);



useEffect(() => {
  if (!buttonclicked) return;
  async function fetchData() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3080ae25famsh2a48333bf8619d4p118e5djsnbca874ca3480',
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
      }
    };
    try {
      const response = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${item ?item.id.videoId : itemz.id}`, options);
      const data = await response.json();
      const downloadapi = data;
      if (selectedquality==='option1')
      
      {
        window.open(downloadapi.formats[0].url)
      }
      else if(selectedquality==='option2'){
        window.open(downloadapi.formats[1].url)
      }
      else if (selectedquality==='option3'){
        window.open(downloadapi.formats[2].url)
      }
      
      else{
      return(
        <p>Please select a a quality</p>
      )
      }
      setbuttonclicked(false);
    } catch (error) {
      console.error(error);
    }
  }
  fetchData();
}, [buttonclicked]);

useEffect(()=>{
  document.addEventListener('click',outsideclick,true)
},[downloadbutton])

const outsideclick=(e)=>{
  if(!refOne.current.contains(e.target))
  {
setdownloadbutton(false)
  }
  else
  {
return null;
  }
}


async function likediv(){
  try{
  const  usersCollectionRef=await collection (db,'users')
 const po=  await getDocs(usersCollectionRef)
 const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
await  console.log(userss.id);
const check=await  userss.find(i=> i.email==emailselector.email)
await  console.log(check)
if ( await check) {

const p = await setDoc(doc(db,'users',check.id),{likedvideos:arrayUnion(item) },{merge:true})
console.log(p);
setlikestate(true)
if(dislikestate==true){
  setdislikestate(false)
  // const  usersCollectionRef= await collection (db,'users')
  // const g=  await getDocs(usersCollectionRef)
  // const  userss= await g.docs.map((i)=>{return{...i.data(),id:i.id}})
  // console.log(userss)
  // const check=await  userss.find(i=> i.email==emailselector.email)
  console.log(check)
 const f= await updateDoc(doc(db,'users',check.id),({dislikedvideos:arrayRemove(item)}))
 await console.log(f)

}

}
else { 

 console.log('like already exists',check.subcriptions, channelData.search)
}
}
catch(err){
console.log(err)
}
}


async function unlike(){
  try{
  const  usersCollectionRef= await collection (db,'users')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  console.log(userss)
  const check=await  userss.find(i=> i.email==emailselector.email)
  console.log(check)
 const f= await updateDoc(doc(db,'users',check.id),({likedvideos:arrayRemove(item)}))
 await console.log(f)
 setlikestate(false);
  }
  catch(err){
    console.log(err);
  }
}

async function dislike(){
  try{
  const  usersCollectionRef=await collection (db,'users')
 const po=  await getDocs(usersCollectionRef)
 const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
await  console.log(userss.id);
const check=await  userss.find(i=> i.email==emailselector.email)
await  console.log(check)
if ( await check) {

const p = await setDoc(doc(db,'users',check.id),{dislikedvideos:arrayUnion(item) },{merge:true})
console.log(p);
setdislikestate(true)
if(likestate==true){
  setlikestate(false)
  const f= await updateDoc(doc(db,'users',check.id),({likedvideos:arrayRemove(item)}))
}
}
else { 

 console.log('like already exists',check.subcriptions, channelData.search)
}
}
catch(err){
console.log(err)
}
}

async function undislike(){
  try{
  const  usersCollectionRef= await collection (db,'users')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  console.log(userss)
  const check=await  userss.find(i=> i.email==emailselector.email)
  console.log(check)
 const f= await updateDoc(doc(db,'users',check.id),({dislikedvideos:arrayRemove(item)}))
 await console.log(f)
 setdislikestate(false);
  }
  catch(err){
    console.log(err);
  }
}

return (
    <>
    <Navbar/>
    <div className='largediv'>
<div className='primary'>
  {
    downloadbutton &&
    
<div className='modal' ref={refOne}>
  <div className='modalheader'>
<img src={ytlogo} className='ytlogomodal'/>
  </div>
  <h2 className='modaldownload'>Download video</h2>
    <div className='downloadvidlink'>
    <input
        type="radio"
        name="options"
        value="option1"
        checked={selectedOption === 'option1'}
        onChange={handleChange}
      />    
       <p>Low - 144p</p>
       </div>
    <div className='downloadvidlink'>
    <input
        type="radio"
        name="options"
        value="option2"
        checked={selectedOption === 'option2'}
        onChange={handleChange}
      />  
      <p>Medium - 360p</p>
    </div>
    <div className='downloadvidlink'>
    <input
        type="radio"
        name="options"
        value="option3"
        checked={selectedOption === 'option3'}
        onChange={handleChange}
      />    
       <p>HD - 720p</p>
    </div>
<div className='modalfooter'>
<button className='modalbutton' onClick={()=>setdownloadbutton(false)}>Cancel</button>
<button className='modalbutton' onClick={()=>setbuttonclicked(true)}>OK</button>
</div>
    </div>

  }
<YouTube
  videoId={ item ? item.id.videoId : itemz.id}
  opts={{
    height: '400',
    width: '700',
    rel: 0,
    modestbranding: 1 
  }}
  onReady={onPlayerReady}
  // onStateChange={onPlayerStateChange}
  style={{marginTop:'80px'}}
/>
{
channelData && channelstats &&videostats &&comments ?
<> 
 <p className='title'>{item ? item.snippet.title : itemz.snippet.title}</p> 
<div className='undertitle'>
  <div className='channelsub'>
<img src={channelData.items[0].snippet.thumbnails.default.url} className='channelpic'/>
<div className='channeltitlesubcount'>

<Link
onClick={()=>{dispatch(channelonclickreducer(channelData))}}
to={`../ChannelPage/:${channelData.items[0].snippet.title}`}
style={{textDecorationLine:'none',color:'white'}}
>
<p className='channeltitle'>{channelData.items[0].snippet.title}</p>
</Link>
 <NumericFormat 
      value={channelstats.items[0].statistics.subscriberCount} // The value to be formatted
      displayType="text" // The display type, can be "input" or "text"
      thousandSeparator={true} 
      suffix=" subscribers"
      className='subcount'
/> 
{/* <p className='subcount'>{channelstats.items[0].statistics.subscriberCount} subscribers</p> */}
</div>
{
loginselector.login==true ? 

 subscribestate==true ?

<button className='subscribeButton'
onClick={()=>{
  async function unsub(){
  const  usersCollectionRef= await collection (db,'users')
  const po=  await getDocs(usersCollectionRef)
  const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
  console.log(userss)
  const check=await  userss.find(i=> i.email==emailselector.email)
  console.log(check)
 const f= await updateDoc(doc(db,'users',check.id),({subscriptions:arrayRemove(channelData)}))
 await console.log(f)
 setchannelstate(null)
 setsubscribestate(i=>!i)
  }
  unsub()
}}
>unsubscribe</button>
:
<button className='subscribeButton'
 onClick={()=>{
  async function database(channelData){
    const  usersCollectionRef=collection (db,'users')
   const po=  await getDocs(usersCollectionRef)
   const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
await  console.log(userss.id);
const check=await  userss.find(i=> i.email==emailselector.email)
await  console.log(check)
  if ( await check) {

const p = await setDoc(doc(db,'users',check.id),{subscriptions:arrayUnion(channelData) },{merge:true})
 console.log(p);
 await setchannelstate(p)
 await console.log(channelstate)
 await  setsubscribestate(i=>!i)

 }
 else { 
 
   console.log('sub already exists',check.subcriptions, channelData.search)
 }
} 
 database(channelData)

 .catch((err)=>{
   console.log(err)
 })
}}
> subscribe</button>

:
<button className='subscribeButton'
>subscribe</button>

}
</div>
<div className='vidbuttons'>
  <button className='dots' onClick={()=>setdownloadbutton(true)}>
  <MdOutlineDownloadForOffline style={{height:'23px',width:'23px', color:'white',marginTop:'2px'}}/>
  </button>
<div className='likediv' >
  <button className='likebutton'> 
  { 
  loginselector.login==true ? 
  likestate==false ?
  <AiOutlineLike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}}
  onClick={()=>likediv()}/>
  :
  <AiFillLike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}}
  onClick={()=>unlike()}/>
:
<AiOutlineLike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}}
onClick={()=>alert('you must login to like video')}/>

}
</button>
  <button className='dislikebutton'> 
  {
    loginselector.login==true ?
    dislikestate==false?
    <AiOutlineDislike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}} 
    onClick={()=>dislike()}
    />
    :
    <AiFillDislike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}} 
    onClick={()=>undislike()}
    />
:
<AiOutlineDislike style={{height:'23px',width:'23px', color:'white',cursor:'pointer'}}
onClick={()=>alert('you must login to dislike video')}/>

  }
  
  </button>
</div>

<div className='share'>
  <RiShareForwardLine style={{height:'23px',width:'23px', color:'white'}}/>
share</div>
<button className='dots'><BsThreeDots style={{height:'23px',width:'23px', color:'white', marginTop: '3px'}}/></button>
</div>
   </div>
<div className='descriptiondiv'>
<div className='viewdiv'>
<NumericFormat 
      value={videostats.items[0].statistics.viewCount} // The value to be formatted
      displayType="text" // The display type, can be "input" or "text"
      thousandSeparator={true} 
      suffix=" views"
      className='viewpara'
      /> 
  
      <TimeAgo date={item ? item.snippet.publishedAt : itemz.snippet.publishedAt} locale="en" className='viewpara' />
</div>
{showdesc ?
<div className='descriptionparagraph'>
{item ? item.snippet.description : itemz.snippet.localized.description}
<p onClick={()=>setshowdesc(false)} style={{cursor:'pointer'}}>Show less</p>
</div>
 :
<div className='descriptionparagraph2' onClick={()=>setshowdesc(true)}>
{item ? item.snippet.description.slice(0,90) : itemz.snippet.localized.description.slice(0,90)}

<p  className='showmorepara'>Show more</p>
</div>
}
</div>
</>
:<p style={{height:'50%'}}>loading</p>


}  

</div>
<div className='secondary'>
{
suggestedVideos&&
suggestedVideos.items.map((video) => (
        <div key={video.id.videoId} className='suggestedvids' onClick={()=>
{        setitem(video)
  console.log(item);
setbool(i=>!i)
window.scrollTo(0, 0);
        }
        }>
          <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} className='thumbnails' />
          <div className= 'subsuggestedvids'>
            {video.snippet.title.length > 50 ?
          <h2 className='videoheadeer'>{video.snippet.title.slice(0,50)}...</h2>
          : 
          <h2 className='videoheadeer'>{video.snippet.title}</h2>
            } 
        <p className='subcount'>{video.snippet.channelTitle}</p>
        <TimeAgo date={video.snippet.publishedAt} locale="en" className='subcount' />
          </div>
        </div>
      ))}

</div>
    </div>
<div className='commentsdiv'>
<div className='makeAComment1'>
  <img src={signedoutprofilepic} className='signedoutprofilepic'/>
  <input placeholder='Add a comment...' value={makeAComment} onChange={(e)=>setmakeAComment(e.target.value )}
  className='commentinput' name='makeacomment' type="text"/>
</div>
<div className='comments'>
{
 comments && comments.items.length>0?
comments.items.map((item)=>
{
  const author=item.snippet.topLevelComment.snippet
  return(
<>
<div className='makeAComment'>
  {
  author.authorProfileImageUrl ?
  (
  <img src={author.authorProfileImageUrl} className='signedinprofilepic'/>
  ):
  (
  <img src={signedoutprofilepic} className='signedinprofilepic'/>
)}
  <div className='commentdetails'>
    <div className='subcommentdetails'>
      <p className='displayusername'>{author.authorDisplayName}</p>
      <TimeAgo date={author.publishedAt} locale="en" className='commenttimeago' />
    </div>
  <p className='comment'>{author.textOriginal}</p>
  <div className='subcommentdetails'>
  <AiOutlineLike style={{height:'15px',width:'15px', color:'white'}}/>
  <AiOutlineDislike style={{height:'15px',width:'15px', color:'white'}}/>
</div>
  </div>
</div>
</>
 )})
 :  <p style={{height:'100%'}}>loading comments</p>
}
</div>
</div>
    </>
  )
}