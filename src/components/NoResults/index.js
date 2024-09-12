import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppTheme from "../../context/theme";
import './index.css'

const NoResults = (props)=>{
    const {SearchRetry} = props
    return(
        <AppTheme.Consumer>
            {
                value=>{
                    const {activeTheme} = value
                    return(
                        <div className="d-flex flex-column justify-content-center w-100 gap-2 align-items-center p-2">
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"  className="failed-img"/>
                            <h1 style={{"font-size":"1.3em"}}>No Search results found</h1>
                            <h1 style={{"font-size":"1em" ,"text-align":"center"}}>
                                Try different key words or remove search filter
                            </h1>
                            <button className="failure-retry-button button" onClick={SearchRetry}>Retry</button>
                        </div>
                    )
                }
            }
        </AppTheme.Consumer>
    )
}
export default NoResults