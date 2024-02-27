import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import style from './App.module.css';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './views/HomePage/HomePage';
import DetailPage from './views/DetailPage/DetailPage'

import NavBar from './components/NavBar/NavBar';
import FormPage from './views/FormPage/FormPage';


function App() {
  const location = useLocation();
  return (
    
      <div>
    
         
         <div className={style.navBar}>
          {location.pathname !== "/" && location.pathname !=="/form" && <NavBar />}
        </div>

        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/form" element={<FormPage />} />
        </Routes>
      </div>
    
  );
}

export default App;
