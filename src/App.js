import './App.css';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import { useState  } from 'react';
import AppTheme from './context/theme';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import Home from './components/Home';

function App() {
  const [activeTheme ,setActiveTheme]= useState('light')

  const toggleTheme = ()=>{
    if (activeTheme === "dark") setActiveTheme('light');
    else setActiveTheme("dark")
  }
  return (
    <AppTheme.Provider value={{
      activeTheme,
      onChangeTheme : toggleTheme
    }}>
          <div className={`body-${activeTheme}`}>
            <BrowserRouter>
              <div className='container'>
                <div className='row d-flex flex-column align-items-center'>
                  <Routes>
                      <Route path='/login' element = {<LoginPage />} />
                      <Route path='/' element = {<ProtectedRoute element={<Home/>} />} />
                  </Routes>

                </div>
              </div>
            </BrowserRouter>
          </div>
    </AppTheme.Provider>
  );
}

export default App;
