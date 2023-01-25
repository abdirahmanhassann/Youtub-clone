import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TimeAgo from 'react-timeago';
import Navbar from '../Bars/Navbar';
import Sidebar from '../Bars/Sidebar';
import './home.css'
import { loginslicereducer } from '../../redux/reducers';
import { Link } from 'react-router-dom';
import { addDoc, arrayUnion, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
export default function ChannelPage() {
  const selector = useSelector((state) => state.reducer.channelonclick);
  const loginselector = useSelector((state)=>state.reducer.login);
  const emailselector= useSelector((state)=>state.reducer.email);
  const [videos, setVideos] = useState([]);
  const [selectorbackup, setselectorbackup] = useState(selector);
  const [subsribestate,setsubscribestate]=useState(false)
  const apikey2 = 'AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
  const apikey1 = 'AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';
const dispatch=useDispatch()

useEffect(() => {
console.log(selector)
  const channelId=selector.search.items[0].id
  fetch(`https://www.googleapis.com/youtube/v3/search?key=${apikey1}&channelId=${ channelId}&part=snippet,id&order=date&maxResults=20`)
    .then(response => response.json())
    .then(data => {setVideos(data.items)

    })
    .catch(error => console.log(error));

}, []);


return (
    <>

<Navbar/>

    <div className="largestdiv">
    <Sidebar/>
{
selector &&
    <div className="home">
    <div className='griddiv'>
<div className='channelinfo'>
  <div className='subchannelinfo'>
    {
    selector ?
    <img src={selector.search.items[0].snippet.thumbnails.medium.url} className="channelimg"/>
    :
   null
    }
  <div className='channeltitlesubcount'>
  <p className='channeltitlelarge'>{ selector.search.items[0].snippet.title}</p>
  <p className='subcountlarge'>{selector.search.items[0].snippet.customUrl}</p>
</div>
</div>
{
loginselector.login==true ? 

<button className='subscribeButton'
 onClick={()=>{
  setsubscribestate(i=>!i)
  async function database(res){
    const  usersCollectionRef=collection (db,'users')
   const po=  await getDocs(usersCollectionRef)
   const  userss= await po.docs.map((i)=>{return{...i.data(),id:i.id}})
 await  console.log(userss.id);
 const check=await  userss.find(i=>i.email==emailselector.email)
await  console.log(check)
   if ( await check) {
    //JSON.parse(JSON.stringify(selector.search))
//const p=     addDoc((check), ({subcriptions:'po poeski'}),{ merge: true})

const p = await setDoc(doc(db,'users',check.id),{subscriptions:arrayUnion(selector) },{merge:true})
  console.log(p);
  }
  else { 
  
    console.log('sub already exists',check.subcriptions, selector.search)
  }
} 
  database(selector)

    //dispatch(accountreducer(res))
 

  .catch((err)=>{
    console.log(err)
  })
 }}
>{subsribestate? 'subscribe': 'unsubscribe'}</button>
:
<button className='subscribeButton'
//  onClick={()=>{
//   if(loginselector.login==true){

//   }}}
>subscribe</button>

}
</div>
    {
     videos&&
        videos.map((item)=>{

    const title= item.snippet.title.slice(0,50)
            return(
                <Link   to={`/${item.id.videoId}`} state={{itemm:item}} style={{textDecorationLine:'none',margin:'5px'}} className='link'>
                <div className='cell' key={Math.random()} >
                <div className='crop'>
        <img src={item.snippet.thumbnails.high.url} className='thumbnail'/>
        </div>
    
    <p className='vidname'>{title} {item.snippet.title.length>50 ?'...': null}</p>
    <div style={{display:'flex',flexDirection:'row'}} className='flexdiv'>
    {/* {channelData.slice(index, index+1).map((pic) => {
                return (
                  <img src={pic} className="channelpic" />
                )
              }) } */}
              <div style={{display:'flex',flexDirection:'column'}}>
    <p className='channelname'>{item.snippet.channelTitle}</p>
    <TimeAgo date={item.snippet.publishedAt} locale="en" className='channelname' />
    </div>
    </div>
    </div>
    </Link>  )
    })
    
    }
   </div>
    </div>}
    </div>
    </>
      
  )
}
