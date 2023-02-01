import React from 'react'
import "./Video.css";
import video from "../../assets/video.mp4";


const VideoBG = () => {
  return (
    <video id="myVideo" src={video} autoPlay loop muted/>
  )
}

export default VideoBG
