import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import './index.css'
import AppTheme from "../../context/theme";
const SavedVideos = (props)=>{

    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme} = value
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout current="Saved videos" />
                        <div className="col-12 col-md-9 p-0 d-flex flex-column">
                            <div className = {`playing-video-component playing-video-component-${activeTheme}`}>                        
                                "Saved videos"
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