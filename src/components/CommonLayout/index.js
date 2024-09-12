import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header";
import Options from "../Options";

import './index.css'

const CommonLayout = (props)=>{
    const {current} = props
    const [showOptions, setShowOptions] = useState(false)
    const OptionSettingsInMobile = ()=>{
        setShowOptions(!showOptions)
    }
    return(
        <>
            <Header OptionSettingsInMobile = {OptionSettingsInMobile}/>
            <Options current = {current} showOptions = {showOptions}/>
        </>
    )
}
export default CommonLayout