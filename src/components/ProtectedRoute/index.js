import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const ProtectedRoute = (props)=>{
    const {element} = props
    const login_token = Cookies.get("login_token")
    console.log(login_token)
    if (login_token===undefined) {
        return (<Navigate to = {'/login'}/>)
    }
    return (element)
}
export default ProtectedRoute