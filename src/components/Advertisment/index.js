import React from "react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const Advertisment = (props)=>{
    const [hide,setHide] = useState("block")
    return(
        <div className={`col-12 col-md-9 p-0 d-${hide}`}>
            <div className="Ad-container d-flex justify-content-between px-4 py-4 w-100">
                <div className="ad-left">
                    <img className="banner-img" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png" />
                    <h1 className="banner-text">Buy Nxt Watch Premium prepaid plans with UPI</h1>
                    <button className="button ad-button">GET IT NOW</button>
                </div>
                <div onClick={()=>(setHide("none"))}>
                    <IoClose/>
                </div>
            </div>
        </div>
    )
}
export default Advertisment