import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import { GoDotFill} from "react-icons/go";
import AppTheme from "../../context/theme"
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

export function formatDistanceToNowWithoutWords(date) {
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    return formattedDate.replace(/\b(over|almost|about)\b/g, '');
  }
const Video = (props)=>{
    const {videoDetails  } = props
    const {id,title,thumbnailUrl,viewCount,publishedAt,channel} = videoDetails
    const navigate = useNavigate()
    return(
        <div className="col-12 col-md-6 col-lg-4" onClick={()=>{navigate(`/video/${id}`)}}>
            <div className="video-container w-100 pb-4">
                <img src={thumbnailUrl} className="video-thumbnail" alt="video-thumbnail"/>

                {/* bottom  */}
                <div className="bottom d-flex mt-2 gap-3 p-2 pt-0 mt-3">
                    {/* channel logo */}
                    <div className="channel-logo">
                        <img src={channel.profileImageUrl} alt="channel-img" className="channel-img" />
                    </div>
                    <div className="bottom-right">
                        <h1 className="video-title">{title}</h1>
                        <AppTheme.Consumer>
                        {
                            value => {
                            const {activeTheme} = value
                            return(
                                <div className={`d-flex justify-content-even align-items-center gap-2 gap-md-2 w-100 footer-video-${activeTheme} flex-md-column align-items-md-start`}>
                                    <h1 className="channel-name m-0">{channel.name}</h1>
                                    <GoDotFill className="dot-icon d-md-none" />
                                    <div className="d-flex justify-content-even align-items-center gap-2 gap-md-2">
                                        <h1 className="view-count m-0" >{viewCount} views</h1>
                                        <GoDotFill className="dot-icon"/>
                                        <h1 className="publish m-0">{formatDistanceToNowWithoutWords(publishedAt)}</h1>
                                    </div>
                                </div>
                            )
                        }}
                        </AppTheme.Consumer>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Video
