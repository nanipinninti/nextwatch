import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import AppTheme from "../../context/theme";
import './index.css'

const Gaming = (props)=>{

    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme} = value
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout current = "Gaming" />
                        <div className="col-12 col-md-9 p-0 d-flex flex-column">
                            <div className = {`playing-video-component playing-video-component-${activeTheme}`}>                        
                                "Gaming"
                            </div>
                        </div>           
                    </div>
                </div>
                )
            }
        }</AppTheme.Consumer>
    )
}
export default Gaming