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
import Popup from "reactjs-popup";
import './index.css'
import { IoClose } from "react-icons/io5";
import Options from "../Options";
import { IoMdHome } from "react-icons/io";
import { MdWhatshot } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { SubOptionComponent } from "../Options";
import { MdOutlinePlaylistAdd } from "react-icons/md";

const OptionDetails = [
    {
        id : "/",
        name : "Home",
        IconComponent : IoMdHome
    },
    {
        id : "/trending",
        name : "Trending",
        IconComponent : MdWhatshot
    },
    {
        id : "/gaming",
        name : "Gaming",
        IconComponent : SiYoutubegaming
    },
    {
        id : "/saved-videos",
        name : "Saved videos",
        IconComponent : MdOutlinePlaylistAdd
    }
]
const Header = (props)=>{
    const {current} = props
    const [currentOption,setCurrentOption] = useState(current)
    const navigate = useNavigate()

    // functionalites
    const toHome = ()=>{
        navigate("/")
    }
    const LogoutFunctionality = ()=>{
        Cookies.remove("login_token")
        navigate("/login")
    }
    const changeOption = (id)=>{
        navigate(id)
    }
    // Popups
    const ReactLogOutPopUp = (activeTheme) => (
        <div >
          <Popup
            modal
            trigger={
                <div>
              <div className="d-lg-none">
                <IoIosLogOut className={`theme-icon theme-icon-${activeTheme}`} />
              </div>
              <button className={`button logout-button logout-button-${activeTheme} d-none d-lg-block`}>
                            Logout
              </button> 
              </div>
            }
            closeOnDocumentClick={false} // Disable clicking outside to close
            lockScroll={true}            // Lock scrolling outside the popup
          >
            {close => (
              <div className="popup-wrapper">
                {/* Background overlay to shade outside the popup */}
                <div className="popup-overlay"></div>
                
                {/* The actual popup content */}
                <div className={`logout-popup logout-popup-${activeTheme}`}>
                  <div>
                    <p>Are you sure you want to logout?</p>
                  </div>
                  <div className="d-flex w-100 justify-content-around">
                    <button
                      type="button"
                      className="trigger-button cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="trigger-button popup-logout-button"
                      style={{
                        color: "white",
                        background: '#3b82f6',
                        border: 'none'
                      }}
                      onClick={() => LogoutFunctionality()}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </Popup>
        </div>
    );
    
    const ReactOptionPopUp = (activeTheme)=>(
        <div>
            <Popup 
                modal
                trigger={
                    <div className="profile  d-lg-none">
                            <MdDehaze className={`theme-icon theme-icon-${activeTheme}`} />
                    </div>
                }
               
            >
                {
                    close=>(
                        <div className={`popup-option-container popup-option-container-${activeTheme}`} >
                            <div onClick={()=>close()} className="popup-close">
                                <IoClose className="icon"/>
                            </div>
                            <div className="popup-options w-100 d-flex flex-column align-items-center justify-content-center">
                            {
                                    OptionDetails.map(option=>(
                                        <SubOptionComponent
                                            key = {option.id}
                                            Details = {option}
                                            currentOption = {currentOption}
                                            activeTheme = {activeTheme}
                                            changeOption = {changeOption}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </Popup>
        </div>
    )
    return (
    <AppTheme.Consumer>
        {value=>{
            const {activeTheme,onChangeTheme} = value
            return(
                <div className="col-12 header-component ">
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
                        <div className="profile d-none d-lg-block">
                            <CgProfile className={`theme-icon theme-icon-${activeTheme}`} />
                        </div>

                        {/* Options */}
                        {ReactOptionPopUp(activeTheme)}

                        {/* logout */}
                        {ReactLogOutPopUp(activeTheme)}
                    </div>
                </div>
            )}}
    </AppTheme.Consumer>
    )
}
export default Header