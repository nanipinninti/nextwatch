import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppTheme from "../../context/theme";
import './index.css'

const NoSavedVideos = ()=>{
    return(
        <AppTheme.Consumer>
            {
                value=>{
                    const {activeTheme} = value
                    return(
                        <div className="d-flex flex-column no-saved-videos justify-content-center w-100 gap-2 align-items-center p-2">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png "  className="failed-img"/>
                            <h1 style={{"font-size":"1.3em"}}>No Saved Videos found</h1>
                            <h1 style={{"font-size":"1em" ,"text-align":"center"}}>
                                You can save your videos while watching them
                            </h1>
                        </div>
                    )
                }
            }
        </AppTheme.Consumer>
    )
}
export default NoSavedVideos