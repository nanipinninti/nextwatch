import React, { useEffect } from "react";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CommonLayout from "../CommonLayout";
import AppTheme from "../../context/theme";
import Failure from "../Failure";
import Loading from "../Loading";
import Cookies from "js-cookie";
import { MdWhatshot } from "react-icons/md";
import TrendingVideo from "../TrendingVideo";
import './index.css'

const constNames = {
    Loading : "loading",
    Failed : "Failed",
    Success : "Success"
}

const Trending = (props)=>{
    const [status , setStatus] = useState(constNames.Loading)
    const [videoDetails , setVideoDetails] = useState(constNames.Loading)

    useEffect(()=>{
        fetchDetails()
    },[])
    const fetchDetails = async ()=>{
        const api = "https://apis.ccbp.in/videos/trending"
        const options = {
            method : "GET",
            headers : {
                Authorization : `Bearer ${Cookies.get("login_token")}`
            }
        }
        try {
            const responce = await fetch(api,options)
            if (responce.ok){
                const data = await responce.json()
                const tempDetails = data.videos.map(video=>(
                    {
                        id : video.id,
                        title : video.title,
                        thumbnailUrl : video.thumbnail_url,
                        viewCount : video.view_count,
                        publishedAt : video.published_at,
                        channel : {
                            name : video.channel.name,
                            profileImageUrl : video.channel.profile_image_url
                        }
                    }
                ))
                setVideoDetails(tempDetails)
                setStatus(constNames.Success)
            }
            else{
                alert("Servor might facing some internal issues! Sorry for inconviniece")
            }

        }catch(e){
            console.log(e)
            alert("Your internet connection might not be fast! Please check your netwrok settings!")
            setStatus(constNames.Failed)
        }
    }
    const currentComponent = (activeTheme)=>{
        switch(status){
            case constNames.Loading:
                return(<Loading />)
            case constNames.Failed:
                return(<Failure />)
            case constNames.Success:
                return( success(activeTheme))
            default :
                return null
        }
    }
    const success =(activeTheme)=>{
        const {id,title,thumbnailUrl,viewCount,publishedAt,channel} = videoDetails
        return(
            <>
                <div className={`trending-header trending-header-${activeTheme}`}>
                    <div>
                        <MdWhatshot style={{height : "30px" , width : "auto", color: "#ff031c"}}/>
                    </div>
                    <h1 style={{fontSize : "1.5em"}}  className="m-0">Trending</h1>
                </div>
                <div className="row p-md-4">
                    {
                        videoDetails.map(video=>(
                            <TrendingVideo key={video.id} videoDetails = {video} />
                        ))
                    }
                </div>
            </>
        )
    }
    return(
        <AppTheme.Consumer>{
            value =>{
                const {activeTheme} = value
                const background = (activeTheme==="light") ? "#f9f9f9" : "#0f0f0f"
                return(
                <div className="col-12">
                    <div className="row">
                        <CommonLayout current ="Trending" />
                        <div className="col-12 col-lg-9  p-0 d-flex flex-column" style={{background : background}}>
                            <div className = {`trending-component trending-component-${activeTheme}`}>                        
                                {
                                    currentComponent(activeTheme)
                                }
                            </div>
                        </div>           
                    </div>
                </div>
                )
            }
        }</AppTheme.Consumer>
    )
}
export default Trending