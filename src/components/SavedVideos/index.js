import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import NoSavedVideos from "../NoSavedVideos";
import Loading from "../Loading";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import './index.css'
import AppTheme from "../../context/theme";
import TrendingVideo from "../TrendingVideo";
import Video from "../Video";


const SavedVideos = (props)=>{
    const currentComponent = (activeTheme,savedVideos)=>{
        if (savedVideos.length===0){
            return (<NoSavedVideos/>)         
        }
        else{ 
            return success(activeTheme,savedVideos)
        }        
    }
    const success = (activeTheme ,savedVideos)=>{ 
        console.log(savedVideos)
        return(
            <>
                <div className={`trending-header trending-header-${activeTheme}`}>
                    <div>
                        <MdOutlinePlaylistAdd style={{height : "30px" , width : "auto", color: "#ff031c"}}/>
                    </div>
                    <h1 style={{fontSize : "1.5em"}}>Saved Videos</h1>
                </div>
                <div className="row p-md-4">
                    {
                        savedVideos.map(video=>(
                            <TrendingVideo key={video.id} videoDetails = {video}/>
                        ))
                    }
                </div>
            </>
        )
    }
    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme,savedVideos} = value
                const background = (activeTheme==="light") ? "#f9f9f9" : "#181818"
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout current="Saved videos" />
                        <div className="col-12 col-lg-10 p-0 d-flex flex-column">
                            <div className = {`saved-video-component saved-video-component-${activeTheme}`} style={{background : background}}>                        
                            {
                                    currentComponent(activeTheme ,savedVideos)
                            }
                            </div>
                        </div>           
                    </div>
                </div>
                )
            }
        }</AppTheme.Consumer>
    )
}
export default SavedVideos