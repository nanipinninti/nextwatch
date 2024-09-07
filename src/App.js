import './App.css';
import { BrowserRouter,Route,Routes,Navigate } from 'react-router-dom';
import AppTheme from './context/theme';
import LoginPage from './components/LoginPage';

function App() {
  return (
    <AppTheme.Consumer>
      {value =>{
        const {activeTheme} = value
        console.log(value)
        return(
          <div className={`body-${activeTheme}`}>
            <BrowserRouter>
              <div className='container'>
                <div className='row d-flex flex-column align-items-center'>
                  <Routes>
                      <Route path='*' element = {<LoginPage />} />
                  </Routes>

                </div>
              </div>
            </BrowserRouter>
          </div>
          )
      }}
      </AppTheme.Consumer>
  );
}

export default App;
