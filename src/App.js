import './App.css';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import { useState  } from 'react';
import AppTheme from './context/theme';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import Gaming from './components/Gaming';
import SavedVideos from './components/SavedVideos';
import Trending from './components/Trending';
import NotFound from './components/NotFound';
import PlayingVideo from './components/PlayingVideo';

function App() {
  const [activeTheme ,setActiveTheme]= useState('light')
  const [savedVideos,setSavedVideos] = useState([])
  const [likedVideos,setLikedVideos] = useState([])
  const [dislikedVideos,setDislikedVideos] = useState([])


  // functionalities
  const toggleTheme = ()=>{
    if (activeTheme === "dark") setActiveTheme('light');
    else setActiveTheme("dark")
  }
  const removeFromSavedVideos = (id)=>{
    // console.log("remvoing....")
    setSavedVideos(prv=>(
      prv.filter(vidId=>(vidId!==id))
  ))
  }

  //  for like
  const addToLikedVideos =(id)=>{
    // console.log("adding to liked videos")
    removeFromDisLikedVideos(id)
    setLikedVideos([...likedVideos,id])
  }
  const removeFromLikedVideos =(id)=>{
    setLikedVideos(prv=>(
      prv.filter(vidId=>(vidId!==id))
  ))
  }
  const addToDisLikedVideos =(id)=>{
    removeFromLikedVideos(id)
    setDislikedVideos([...dislikedVideos,id])
  }
  const removeFromDisLikedVideos =(id)=>{
    setDislikedVideos(prv=>(
      prv.filter(vidId=>(vidId!==id))
  ))
  }
  return (
    <AppTheme.Provider value={{
      activeTheme,
      onChangeTheme : toggleTheme,
      savedVideos,
      addToSavedVideos : (id)=>{setSavedVideos([...savedVideos,id])},
      removeFromSavedVideos : removeFromSavedVideos,

      likedVideos ,
      addToLikedVideos : addToLikedVideos,
      removeFromLikedVideos : removeFromLikedVideos,

      dislikedVideos,
      addToDislikedVidoes : addToDisLikedVideos,
      removeFromDislikedVideos : removeFromDisLikedVideos,
    }}>
          <div className={`body-${activeTheme} body`}>
            <BrowserRouter>
              <div className='container'>
                <div className='row d-flex flex-column align-items-center'>
                  <Routes>
                      <Route path='/login' element = {<LoginPage />} />
                      <Route path='/' element = {<ProtectedRoute element={<Home/>} />} />
                      <Route path='/video/:id' element = {<ProtectedRoute element={<PlayingVideo/>} />} />
                      <Route path='/gaming' element = {<ProtectedRoute element={<Gaming/>} />} />
                      <Route path='/trending' element = {<ProtectedRoute element={<Trending/>} />} />
                      <Route path='/saved-videos' element = {<ProtectedRoute element={<SavedVideos/>} />} />
                      <Route path='*' element = {<ProtectedRoute element={<NotFound/>} />} />
                  </Routes>

                </div>
              </div>
            </BrowserRouter>
          </div>
    </AppTheme.Provider>
  );
}

export default App;
