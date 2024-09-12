import './index.css'
import CommonLayout from '../CommonLayout'
const NotFound = ()=>{
    return (
        <div className='col-12'>
            <div className='row'>
                <CommonLayout />
                <div className='col-12 col-md-9 not-found-container'>
                    <img src='https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
                        alt='not-found-path' className='not-found-img' />
                    <h1 className='not-found-head'>Page Not Found</h1>
                    <p className='not-found-p'>We are sorry,the page you requested could not be found</p>
                </div>
            </div>
        </div>
    )
}
export default NotFound