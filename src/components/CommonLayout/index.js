import React from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../Header";
import Options from "../Options";

import './index.css'

const CommonLayout = (props)=>{
    const {current} = props
    return(
        <>
            <Header current = {current}/>
            <Options current = {current} />
        </>
    )
}
export default CommonLayout