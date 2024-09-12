import React, { useEffect } from "react";
import { useState } from "react";
import Header from "../Header";
import Options from "../Options";
import Advertisment from "../Advertisment";
import AppTheme from "../../context/theme";
import SearchBar from "../SearchBar";
import Video from "../Video";
import Cookies from "js-cookie";
import Failure from "../Failure";
import Loading from "../Loading";
import NotFound from "../NotFound";
import NoResults from "../NoResults";
import CommonLayout from "../CommonLayout";
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.css'

const constNames = {
    Loading : "loading",
    Failed : "Failed",
    Success : "Success"
}
const Home = (props)=>{
    const [searchVal,setSearchVal] = useState("")
    const [videoDetails,setVideoDetails] = useState([])
    const [status,setStatus] = useState(constNames.Loading)
    const [onSearchVal , setOnSearchVal] = useState("")

    useEffect(()=>{
        fetchingDetails()
    },[status,onSearchVal])
    const FailedRetry = ()=>{
        setStatus(constNames.Loading)
    }
    const fetchingDetails = async ()=>{
        const api = `https://apis.ccbp.in/videos/all?search=${searchVal}`
        const login_token = Cookies.get("login_token")
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${login_token}`
            }
        }
        try{
            const responce = await fetch(api,options)        
            if (responce.ok){
                const data = await responce.json()
                const tempDetails = data.videos.map(video=>({
                        id : video.id,
                        title : video.title,
                        thumbnailUrl : video.thumbnail_url,
                        viewCount : video.view_count,
                        publishedAt : video.published_at,
                        channel : {
                            name : video.channel.name,
                            profileImageUrl : video.channel.profile_image_url
                        }
                    }))
                
                // console.log(tempDetails)
                setVideoDetails(tempDetails)
                setStatus(constNames.Success)
            }
            else{
                setStatus(constNames.Failed)
            }
        }
        catch(e){
            setStatus(constNames.Failed)
        }
    }
    const VideosComponet = ()=>{
        if (videoDetails.length === 0) return(<NoResults SearchRetry = {FailedRetry}/>)
        console.log(videoDetails[0])
        return(
            <div className="row videos-component">
               {
                    videoDetails.map(video=>(
                        <Video 
                            key = {video.id}
                            videoDetails = {video}
                        />
                    ))
                }
            </div>
        )        
    }
    const Current_component = ()=>{
        switch(status){
            case constNames.Success :
                return(VideosComponet())
            case constNames.Failed : 
                return(<Failure FailedRetry= {FailedRetry} />)
            case constNames.Loading:
                return (<Loading />)
            default:
                return null
        }
    }
    const searchButtonClick = ()=>{
        setOnSearchVal(searchVal)
        setStatus(constNames.Loading)
    }
    return(
        <div className="col-12">
            <div className="row">
                <CommonLayout current = "Home" />
                {        <AppTheme.Consumer>
                            {
                                value =>{
                                    const {activeTheme} = value
                                    const background = (activeTheme==="light") ? "#f4f4f4" : "#0f0f0f"
                                    return(
                                        <div className="col-12 col-md-9 p-0 d-flex flex-column  home-right" style={{background : background}} >
                                            <Advertisment/>
                                            <SearchBar searchVal = {searchVal} setSearchVal = {setSearchVal} 
                                                        searchButtonClick = {searchButtonClick} />

                                            {/* Videos */}
                                            {
                                                Current_component()
                                            }
                                        </div>
                                    )
                                }
                            }
                        </AppTheme.Consumer>
                }
            </div>
        </div>
    )
}
export default Home