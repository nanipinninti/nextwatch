import React from "react";
import AppTheme from "../../context/theme";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { MdDehaze } from "react-icons/md";

import './index.css'

const Header = (props)=>{
    const {OptionSettingsInMobile}  = props
    const navigate = useNavigate()

    // functionalites
    const toHome = ()=>{
        navigate("/")
    }
    const LogoutFunctionality = ()=>{
        Cookies.remove("login_token")
        navigate("/login")
    }
    return (
    <AppTheme.Consumer>
        {value=>{
            const {activeTheme,onChangeTheme} = value
            return(
                <div className="col-12 header-component">
                    <div onClick={toHome}>
                        <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                                        className="web-img" />
                    </div>
                    <div className="d-flex gap-3">
                        {/* Mode */}
                        <div onClick={onChangeTheme}>
                            {
                                (activeTheme==='light') ? <MdDarkMode className="theme-icon" />
                                : <MdOutlineLightMode className="theme-icon" style={{color : "white"}} />
                            }
                        </div>

                        {/* Profile */}
                        <div className="profile d-none d-md-block">
                            <CgProfile className={`theme-icon theme-icon-${activeTheme}`} />
                        </div>

                        {/* Options */}
                        <div className="profile  d-md-none" onClick={OptionSettingsInMobile}>
                            <MdDehaze className={`theme-icon theme-icon-${activeTheme}`} />
                        </div>

                        {/* Logout */}
                        <div onClick={LogoutFunctionality} className="d-lg-none">
                            <IoIosLogOut className={`theme-icon theme-icon-${activeTheme}`} />
                        </div>
                        <button className={`button logout-button logout-button-${activeTheme} d-none d-lg-block`} onClick={LogoutFunctionality}>
                            Logout
                        </button>
                    </div>
                </div>
            )}}
    </AppTheme.Consumer>
    )
}
export default Header