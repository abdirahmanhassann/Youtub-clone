import './Sidebar.css'
import React from 'react'
import {AiFillHome, AiOutlineHistory, AiOutlineLike} from 'react-icons/ai'
import {BsPlay} from 'react-icons/bs'
import {MdOutlineSubscriptions,MdOutlineVideoLibrary} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
 export default function () {
  const loginselector = useSelector((state)=>state.reducer.login);
    const iconstyle={
        height:'20px',
        width:'auto',
color:'white'
    }

  return (
    <>
        {
    loginselector.login==true ? 

    <div className='sidebar'>
      <Link to ='/' className='link'>
<div className='homediv' >
<AiFillHome  style={iconstyle}/>
Home
</div>
      </Link>

      <Link to='/LikedVids' className='link'>
<div className='shortsdiv'>
<AiOutlineLike style={iconstyle}/>
Liked
</div>
</Link>

<Link to='/SubsPage' className='link'>

<div className='subscriptions'>
<MdOutlineSubscriptions style={iconstyle}/>
Subscriptions
</div>
</Link>

<Link to='/WatchHistory' className='link'>
<div className='library'>
<AiOutlineHistory style={iconstyle}/>
History
</div>
</Link>
    </div>
    :
    <div className='sidebar'>
          <Link to ='/' className='link'>
<div className='homediv'>
<AiFillHome  style={iconstyle}/>
Home
</div>
    </Link> 

<div className='shortsdiv' onClick={()=>alert('you must login to view liked videos')}>
<AiOutlineLike style={iconstyle}/>
Liked
</div>
<div className='subscriptions' onClick={()=>alert('you must login to view subscriptions')}>
<MdOutlineSubscriptions style={iconstyle}/>
Subscriptions
</div>
<div className='library' onClick={()=>alert('you must login to view watched videos')}>
<AiOutlineHistory style={iconstyle}/>
History
</div>
    </div>
    }
    </>
  )
}
