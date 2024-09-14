import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppTheme from "../../context/theme";
import './index.css'

const Failure = (props)=>{
    const {FailedRetry} = props
    return(
        <AppTheme.Consumer>
            {
                value=>{
                    const {activeTheme} = value
                    const Source = (activeTheme==="dark") ? "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png":
                            "https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
                    return(
                        <div className="d-flex flex-column failure-container justify-content-center  gap-2 align-items-center p-2">
                            <img src={Source}  className="failed-img"/>
                            <h1 style={{"font-size":"1.3em"}}>Oops! Something Went Wrong</h1>
                            <h1 style={{"font-size":"1em" ,textAlign : "center"}}>
                                We are having some trouble to complete your request. Please try again.
                            </h1>
                            <button className="failure-retry-button button" onClick={FailedRetry}>Retry</button>
                        </div>
                    )
                }
            }
        </AppTheme.Consumer>
    )
}
export default Failure