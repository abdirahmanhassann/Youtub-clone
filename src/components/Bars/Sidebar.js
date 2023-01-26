import './Sidebar.css'
import React from 'react'
import {AiFillHome} from 'react-icons/ai'
import {BsPlay} from 'react-icons/bs'
import {MdOutlineSubscriptions,MdOutlineVideoLibrary} from 'react-icons/md'
import { Link } from 'react-router-dom'
 export default function () {
    const iconstyle={
        height:'20px',
        width:'auto',
color:'white'
    }

  return (
    <div className='sidebar'>


<div className='homediv'>
<AiFillHome  style={iconstyle}/>
Home
</div>

<div className='shortsdiv'>
<BsPlay style={iconstyle}/>
Shorts
</div>
<div className='subscriptions'>
<MdOutlineSubscriptions style={iconstyle}/>
Subscriptions
</div>
<div className='library'>
<MdOutlineVideoLibrary style={iconstyle}/>
Library
</div>
    </div>
  )
}
