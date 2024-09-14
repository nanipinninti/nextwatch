import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {formatDistanceToNow} from 'date-fns'
import { GoDotFill} from "react-icons/go";
import AppTheme from "../../context/theme"
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const GamingVideo = (props)=>{
    const {videoDetails  } = props
    const {id,title,thumbnailUrl,viewCount} = videoDetails
    const navigate = useNavigate()
    return(
        <div className="col-6 col-md-4" onClick={()=>{navigate(`/video/${id}`)}}>
            <div className="video-container w-100 pb-4">
                <img src={thumbnailUrl} className="gaming-video-thumbnail" alt="video-thumbnail"/>

                {/* bottom  */}
                <div className="bottom d-flex mt-2 gap-3 p-2 pt-0 mt-3">
                    <div className="bottom-right">
                        <h1 className="video-title">{title}</h1>
                        <AppTheme.Consumer>
                        {
                            value => {
                            const {activeTheme} = value
                            return(
                                <div className={`d-flex justify-content-even align-items-center gap-2 gap-md-2 w-100 footer-video-${activeTheme}`}>
                                    <h1 className="view-count m-0" >{viewCount} Watching Worldwide</h1>
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
export default GamingVideo
