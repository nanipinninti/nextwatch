import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import { GoDotFill} from "react-icons/go";
import AppTheme from "../../context/theme"
import 'bootstrap/dist/css/bootstrap.min.css';
import { formatDistanceToNowWithoutWords } from "../Video";

import './index.css'

const TrendingVideo = (props)=>{
    const {videoDetails  } = props
    const {id,title,thumbnailUrl,viewCount,publishedAt,channel} = videoDetails
    const navigate = useNavigate()
    return(
        <div className="col-12" onClick={()=>{navigate(`/video/${id}`)}}>
            <div className="trending-video-container pb-4 d-flex flex-column flex-sm-row gap-2">
                <img src={thumbnailUrl} className="trending-video-thumbnail" alt="video-thumbnail"/>

                {/* right  */}
                <div className="bottom d-flex gap-3 p-2 pt-0 mt-3">
                    {/* channel logo */}
                    <div className="channel-logo d-sm-none">
                        <img src={channel.profileImageUrl} alt="channel-img" className="channel-img" />
                    </div>
                    <div className="trending-bottom-right">
                        <h1 className="video-title">{title}</h1>
                        <AppTheme.Consumer>
                        {
                            value => {
                            const {activeTheme} = value
                            return(
                                <div className={`w-100 footer-video-${activeTheme} d-flex flex-row flex-sm-column gap-sm-2 align-items-center align-items-sm-start gap-2`}>
                                    <h1 className="trending-channel-name m-0">{channel.name}</h1>
                                    <GoDotFill className="dot-icon d-block d-sm-none"/>
                                    <div className="d-flex  flex-sm-row justify-content-xs-even align-items-center align-items-center align-items-sm-center gap-2 gap-sm-2">
                                        <h1 className="view-count m-0" >{viewCount} Views</h1>
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
export default TrendingVideo
