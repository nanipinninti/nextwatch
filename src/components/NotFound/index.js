import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppTheme from "../../context/theme";
import CommonLayout from "../CommonLayout";
import './index.css'

const NotFound = ()=>{
    return(
        <div className="col-12">
             <div className="row">
                <CommonLayout />
                {
                <AppTheme.Consumer>
                {
                    value=>{
                        const {activeTheme} = value
                        const Source = (activeTheme==="light") ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png":
                                "https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                        const color = (activeTheme==="light") ? "#727e8c":"#616a70"
                        return(
                            <div className="col-12 col-lg-9 d-flex flex-column failure-container justify-content-center  gap-2 align-items-center p-2">
                                <img src={Source}  className="failed-img"/>
                                <h1 style={{"font-size":"1.6em"}}>Page Not Found</h1>
                                <h1 style={{"font-size":"1.2em" ,textAlign : "center" , color : color}}>
                                    We are sorry,the page you requested could not be found
                                </h1>
                            </div>
                        )
                    }
                }
                </AppTheme.Consumer>}
            </div>
        </div>
    )
}
export default NotFound