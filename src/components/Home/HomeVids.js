import React, { useLayoutEffect } from 'react'
import { useEffect } from 'react'
import './home.css'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import TimeAgo from 'react-timeago';
import { Link } from 'react-router-dom';
import { BsChevronCompactLeft } from 'react-icons/bs';
export default function HomeVids() {
const [error2, setError2] = useState(null);
const [aray,setarray]=useState([])
const [channelData,setChannelData]=useState([]);
const [loading, setLoading] = useState(true);
// const [popularVideos,setpopularvideos]=useState(null)
const [clint,setclint]=useState()
const dispatch= useDispatch();
  const recommendedvidss =useSelector(state=>state.recommendedvids);
  const watch =useSelector(state=>state.watch) 
  const videos=[]
  const apikey1='AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI';
const apikey2='AIzaSyCI5cZlzuALmkPL41zHTzAhOCFdITMDP_E';

  useEffect(() => {
      async function getRecommendations() {
        try {
          fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=24&regionCode=GB&key=${apikey1}`)
  .then(response => response.json())
  .then(data => {
    // Iterate over each video
    // data.items.forEach(video => {
    //   // Make a request to the channels API endpoint using the channelId of the video
    //   fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${video.snippet.channelId}&key=AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI`)
    //     .then(response => response.json())
    //     .then(channelData => {
    //       // Get the thumbnail image of the channel
    //       const thumbnailUrl = channelData.items[0].snippet.thumbnails.default.url;
    //       // Add the thumbnail image to the video object
    //       video.thumbnailUrl = thumbnailUrl;
    //     console.log(video)
    //     videos.push(thumbnailUrl);
    //     //    console.log(thumbnailUrl)
    //     });
    // });
    setChannelData(videos)
    setclint(data)
    console.log(data)
  //  dispatch(recommendedvids(recommendedvids.state = data))
  });

          // const res = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=24&regionCode=GB&key=AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI`);
          // const data = await res.json();
      // await console.log(data)

      //  await console.log(recommendedvids.state)
        } catch (err) {
          setError2(err);
        }
      }
      getRecommendations();

    }, []);

    //  useEffect(()=>{     async function channelpic(item) {
    //             recommendedvids.state.items.map(async item => {
    //                 const res = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item.snippet.channelId}&key=AIzaSyC4_fXH7BlVagbK7YjkB9Ne3tYGeK6jdNI`);
    //                 const channelData1 = await res.json();
    //                 await setChannelData(channelData1);
    //                 await console.log(channelData);
    //               });
    //             }
    //             channelpic();
    //        },[])
    
    
  return (
          <>
<div className='griddiv'>
{
 clint&&
    clint.items.map((item,index=0)=>{
      index ++;
const title= item.snippet.title.slice(0,50)
        return(
            <Link   to={`/${item.id}`} state={{item:item}} style={{textDecorationLine:'none',margin:'5px'}} className='link'>
            <div className='cell' key={Math.random()} >
            <div className='crop'>
    <img src={item.snippet.thumbnails.standard.url} className='thumbnail'/>
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
</>
    )
}
