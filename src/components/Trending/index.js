import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import AppTheme from "../../context/theme";
import './index.css'

const constNames = {
    Loading : "loading",
    Failed : "Failed",
    Success : "Success"
}

const success =()=>{
    return(
        'hi'
    )
}
const Trending = (props)=>{
    const [status , setStatus] = useState(constNames.Loading)
    const currentComponent = ()=>{
        switch(status){
            case constNames.Loading:
                return(<Loading />)
            case constNames.Failed:
                return(<Failure />)
            case constNames.Success:
                return( success())
        }
    }
    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme} = value
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout current ="Trending" />
                        <div className="col-12 col-md-9 p-0 d-flex flex-column">
                            <div className = {`playing-video-component playing-video-component-${activeTheme}`}>                        
                                "Trending"
                            </div>
                        </div>           
                    </div>
                </div>
                )
            }
        }</AppTheme.Consumer>
    )
}
export default Trending