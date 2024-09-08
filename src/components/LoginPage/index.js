import React from "react";
import { useState } from "react";
import AppTheme from "../../context/theme";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

const LoginPage = ()=>{

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [showpassword,setShowpassword] = useState('password')
    const [errorMsg,setErrorMsg] = useState('')
    
    const navigate = useNavigate()

    if (Cookies.get("login_token")!==undefined) {
        return (<Navigate to={'/'}/>)
    }

    const onSubmit = async (event)=>{
        event.preventDefault()

        const api = 'https://apis.ccbp.in/login'
        const userDatails = {username,password}
        const options = {
            method : "POST",
            body : JSON.stringify(userDatails)
        }

        const responce = await fetch(api,options)
        const data = await responce.json()
        if (responce.ok){
            // console.log("Login success")
            const login_token = data.jwt_token
            Cookies.set("login_token",login_token,{ expires : 7})
            navigate('/')
        }
        else{
            // console.log("Login Fail")
            setErrorMsg(`* ${data.error_msg}`)
        }
    }
    return(
        <AppTheme.Consumer>

        { value =>{
            const {activeTheme} = value
            const classNameForErrorMsg = (errorMsg==='')?'hide' : 'flex'
            return(
                <div className={`col-11 Login-page-component Login-page-component-${activeTheme} d-flex flex-column align-items-center justify-content-center`} style={{"min-height":"100vh"}}>
                    <div className="row d-flex flex-column">
                        <div className={`col-12 col-lg-6  login-page-container login-page-container-${activeTheme} d-flex flex-column align-items-center justify-content-center`}>
                            {/* next watch logo */}
                            <img src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                                className="login-img" />

                            {/* username field */}
                            <div className="d-flex flex-column w-100">
                                <h1 className={`input-question input-question-${activeTheme}`}>Username</h1>
                                <input type="text" className="input-login"
                                    value={username}
                                    onChange={e=>setUsername(e.target.value)}
                                    placeholder="Username"
                                />
                            </div>

                            {/* password field */}
                            <div className="d-flex flex-column w-100">
                                <h1 className={`input-question input-question-${activeTheme}`}>Password</h1>
                                <input type={showpassword} className="input-login"
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                            </div>

                            {/* show password check box */}
                            <div className="d-flex w-100 gap-2">

                                <input type="checkbox" onClick={
                                    ()=>{setShowpassword(prv=>(
                                        (prv === 'password') ? 'text' : 'password'
                                    ))}
                                }/>
                                <h1 className="check-box-text m-0" style={(activeTheme==='light')?({color :"black"}) : ({color :"white"})} >Show Password</h1>
                            </div>
                            
                            <div className="w-100 my-2" style={{'height' : '50px'}}>
                                <button type="submit" 
                                    className="button login-button"
                                    onClick={onSubmit}>
                                        Login
                                </button>
                                <div className={`d-${classNameForErrorMsg} mt-2`}>
                                    <h1 className="error-msg">{errorMsg}</h1>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
        )}}
        </AppTheme.Consumer>
    )
}
export default LoginPage