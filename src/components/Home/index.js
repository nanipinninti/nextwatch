import React from "react";
import { useState } from "react";
import Header from "../Header";
import Options from "../Options";
import Advertisment from "../Advertisment";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const Home = (props)=>{
    const [showOptions ,setShowOptions] = useState(false)
    const OptionSettingsInMobile = ()=>{
        setShowOptions(!showOptions)
    }

    return(
        <div className="col-12">
            <div className="row">
                <Header OptionSettingsInMobile = {OptionSettingsInMobile}/>
                <Options showOptions = {showOptions} />
                <Advertisment/>
            </div>
        </div>
    )
}
export default Home