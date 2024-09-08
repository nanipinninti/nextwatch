import React from "react";
import { useState } from "react";
import AppTheme from "../../context/theme";
import { IoMdHome } from "react-icons/io";
import { MdWhatshot } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaFacebook } from "react-icons/fa";
import { PiXLogoFill } from "react-icons/pi";
import { FaLinkedin } from "react-icons/fa";

import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const OptionDetails = [
    {
        id : "Home",
        name : "Home",
        IconComponent : IoMdHome
    },
    {
        id : "Trending",
        name : "Trending",
        IconComponent : MdWhatshot
    },
    {
        id : "Gaming",
        name : "Gaming",
        IconComponent : SiYoutubegaming
    },
    {
        id : "SavedVideos",
        name : "Saved videos",
        IconComponent : MdOutlinePlaylistAdd
    }
]
const SubOptionComponent = (props)=>{
    const {Details,currentOption,activeTheme,changeOption} = props
    const {id,name,IconComponent} = Details
    const IsItCurrent = (id===currentOption) ? `current-option current-option-${activeTheme}` : ""
    return(
        <div className = {`sub-option-container  ${IsItCurrent}`} onClick={()=>{changeOption(id)}}> 
            <div style={(IsItCurrent!=="")?{color : "red"}:{}}>
                <IconComponent  />
            </div>
            <h1 className="sub-option-text m-0">{name}</h1>
        </div>
    )
}

const OptionsFooterComponent = (props)=>{
    const {AppTheme} = props
    return(
        <div className="options-footer" style={(AppTheme==="light")?{color : "#00306e"}:{}}>
            <h1 className="footer-head" style={{'font-size':"1.2em"}}>Contact Us</h1>

            {/* social media icons */}
            <div className="social-media-icons d-flex gap-3 ">
                <div >
                    <FaFacebook  style={{height : "auto",width : "25px" , color :"#3b5998"}}/>
                </div>
                <div >
                    <PiXLogoFill  style={{height : "auto",width : "25px"}}/>
                </div>
                <div>
                    <FaLinkedin  style={{height : "auto",width : "25px" , color :"#0077B5"}}/>
                </div>
            </div>
            <h1 style={{'font-size':"0.9em" ,"margin-top": "10px","max-width":"85%"}}>
                Enjoy! Now to see your channels and reccomendations!
            </h1>
        </div>
    )
}
const Options = (props)=>{
    const {showOptions} = props
    const [currentOption,setCurrentOption] = useState('Home')

    const DisplyOrNotInMobile = (showOptions)?"flex": "none"
    const changeOption = (id)=>{
        setCurrentOption(id)
    }
    return(
        <AppTheme.Consumer>
            {
                value =>{
                    const {activeTheme} = value
                    return(
                        <div className= {`col-12 col-md-3 d-${DisplyOrNotInMobile} d-md-flex options-container options-container-${activeTheme}`}>
                            <div className="options">
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
                            <div className="options-footer">
                                <OptionsFooterComponent 
                                    AppTheme = {activeTheme}
                                />
                            </div>
                        </div>
                    )
                }
            }
        </AppTheme.Consumer>
    )
}
export default Options