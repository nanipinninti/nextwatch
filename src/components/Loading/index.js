import { ThreeDots } from "react-loader-spinner"
const Loading = ()=>{
    return(
        <div data-testid="loader" className='col-12 w-100 d-flex align-items-center justify-content-center'  style={{ height: '60vh' }}>
                    <ThreeDots 
                        type="ThreeDots" 
                        color="#3b82f6" 
                        height={50} 
                        width={50} 
                    />
        </div>
    )
}
export default Loading