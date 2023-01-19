import Navbar from "../Bars/Navbar";
import React, { useEffect } from 'react'
import Sidebar from "../Bars/Sidebar";
import './home.css'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import HomeVids from "./HomeVids";

export default function () {
  useEffect(()=>{
    window.scrollTo(0, 0);

  })
  return (
    <>
      <Navbar/>
      <div className="largestdiv">
    <Sidebar/>
    <div className="home">
<HomeVids/>
</div>
    </div>
    </>
  )
}


