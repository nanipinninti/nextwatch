import React, { useEffect } from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import ReactPlayer from 'react-player/youtube'
import Loading from "../Loading";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import AppTheme from "../../context/theme";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import {formatDistanceToNow , formatRelative} from 'date-fns'
import Failure from "../Failure";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { GoDotFill} from "react-icons/go";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import './index.css'

const constNames = {
    Loading : "loading",
    Failed : "Failed",
    Success : "Success"
}

function formatDistanceToNowWithoutOver(date) {
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    return formattedDate.replace('over ', '');
  }
const PlayingVideo = (props)=>{
    const {id} = useParams()
    const [status,setStatus] = useState(constNames.Loading)
    const [videoDetails,setVideoDetails] = useState({})

    useEffect(()=>{
        fetchDetails()
    },[status])
    const fetchDetails =  async ()=>{        
        const api = `https://apis.ccbp.in/videos/${id}`
        const options = {
            method : "GET",
            headers : {
                Authorization :   `Bearer ${Cookies.get("login_token")}`    
            }
        }
        try{
            const responce = await fetch(api,options)
            if (responce.ok){
                const data = await responce.json()
                console.log(data)
                const video = data.video_details // here just to reduce redundancy
                const tempVideoDetails = 
                        {
                            id : video.id,
                            title : video.title,
                            videoUrl : video.video_url,
                            thumbnailUrl : video.thumbnail_url,
                            channel : {
                                name : video.channel.name,
                                profileImageUrl : video.channel.profile_image_url,
                                subscriberCount : video.channel.subscriber_count
                                        },
                            viewCount : video.view_count,
                            publishedAt : video.published_at,
                            description : video.description
                        }
                // console.log(tempVideoDetails)
                setVideoDetails(tempVideoDetails)
                setStatus(constNames.Success)
            }
            else{
                setStatus(constNames.Failed)
                alert("Internal error! Sorry for inconvinience")
            }
        }
        catch(e){
            setStatus(constNames.Failed)
            alert("Sorry, internel servor might facing some issues. Please try again Later!")
        }
    }
    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme , addToSavedVideos ,removeFromSavedVideos , savedVideos ,likedVideos,
                    addToLikedVideos ,removeFromLikedVideos,dislikedVideos,addToDislikedVidoes,removeFromDislikedVideos} = value
                const {title ,id,videoUrl,thumbnailUrl,channel,viewCount,publishedAt,description} = videoDetails 
                // console.log(savedVideos)
                const success= ()=>(
                    <div className="col-12 col-lg-9 p-0 d-flex flex-column">
                            <div className = {`playing-video-component playing-video-component-${activeTheme}`}>                        
                                <ReactPlayer url={videoUrl}
                                    width="100%"
                                    />
                                <div className={`playing-component-body`}>
                                    <h1 className="playing-video-title">{title}</h1>
                                    <div className="w-100 d-flex flex-column flex-md-row justify-content-between align-items-md-center my-4 gap-3">

                                        <div className="d-flex align-items-center gap-1">
                                            <h1 className="playing-video-views m-0">{viewCount} Views</h1>
                                            <GoDotFill className="dot-icon" style={{height : "8px",marginTop :"3px"}}/>
                                            <h1 className="playing-video-views m-0">{formatDistanceToNowWithoutOver(publishedAt)}</h1>
                                        </div>

                                        <div className="d-flex gap-2 align-items-center">

                                            {/* For like */}
                                            <div>
                                            {
                                                (likedVideos.includes(videoDetails))?
                                                    (
                                                        <div style={{color : "#2563eb"}} onClick={()=>{removeFromLikedVideos(videoDetails)}} className="d-flex gap-2">
                                                            <BiSolidLike />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Like</h1>
                                                        </div>
                                                    )

                                                    :
                                                    (
                                                        <div style={{color : "#64748b"}} onClick={()=>{addToLikedVideos(videoDetails)}} className="d-flex gap-2">
                                                            <BiLike />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Like</h1>
                                                        </div>
                                                    )
                                        
                                            }                                            
                                            </div>

                                            {/* for dislike */}
                                            <div>
                                            {
                                                (dislikedVideos.includes(videoDetails))?
                                                    (
                                                        <div style={{color : "#2563eb"}} onClick={()=>{removeFromDislikedVideos(videoDetails)}} className="d-flex gap-2">
                                                            <BiSolidDislike />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Dislike</h1>
                                                        </div>
                                                    )

                                                    :
                                                    (
                                                        <div  style={{color : "#64748b"}} onClick={()=>{addToDislikedVidoes(videoDetails)}} className="d-flex gap-2">
                                                            <BiDislike />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Dislike</h1>
                                                        </div>
                                                    )
                                        
                                            }                                            
                                            </div>


                                            {/* for saved vidoes */}
                                            <div>
                                            {
                                                (savedVideos.includes(videoDetails))?
                                                    (
                                                        <div  style={{color : "#2563eb"}} onClick={()=>{removeFromSavedVideos(videoDetails)}} className="d-flex gap-2">
                                                            <MdOutlinePlaylistAddCheck />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Saved</h1>
                                                        </div>
                                                    )

                                                    :
                                                    (
                                                        <div style={{color : "#64748b"}} onClick={()=>{addToSavedVideos(videoDetails)}} className="d-flex gap-2">
                                                            <MdOutlinePlaylistAdd />
                                                            <h1 className="m-0" style={{fontSize : "0.9em"}}>Save</h1>
                                                        </div>
                                                    )
                                        
                                            }                                            
                                            </div>
                                            
                                        </div>
                                    </div>

                                    <hr className="separator"/>
                                    <div className="playing-video-bottom">
                                        {/* channel  */}
                                        <div className="d-flex gap-2 gap-md-3">
                                            {/* channel img */}
                                            <div>
                                                <img src={channel.profileImageUrl} className="playing-video-profile"/>
                                            </div>

                                            {/* channel name and subscribers */}
                                            <div className="d-flex flex-column">
                                                <h1 className="playing-video-channel-name">{channel.name}</h1>
                                                <h1 className="playing-video-channel-subscribers" style={(activeTheme==="light")?{color :  '#8eacc0'}: {color : '#64748b'}}>
                                                {channel.subscriberCount} subscribers</h1>
                                            </div>
                                        </div>

                                        <div>
                                            <h1 className="playing-video-description">{description}</h1>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div> 
                )
                const Current_component = ()=>{
                    switch(status){
                        case constNames.Loading:
                            return (<Loading />)
                        case constNames.Failed:
                            return (<Failure FailedRetry={()=>{setStatus(constNames.Loading)}}/>)
                        case constNames.Success :
                            return(success())
                        default : 
                            return null
                    }
                }
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout  />
                        {
                            Current_component()
                        }
                    </div>
                </div>
                )
            }
        }</AppTheme.Consumer>
        
    )
}
export default PlayingVideo