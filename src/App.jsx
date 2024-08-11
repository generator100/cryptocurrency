import React from 'react';
import NavBar from './components/Navbar/NavBar';
import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home"
import Coin from './pages/Coin/Coin';
import Footer from './components/Footer/Footer';
import LoginSignup from './pages/login/LoginSignup';

const App = () => {
  return (
    <div className='app'>
      <NavBar/>
     <Routes>
       <Route path='/login' element={<LoginSignup/>}/>
      <Route  path='/' element={<Home/>}/>
      <Route  path='/coin/:coinId' element={<Coin/>}/>
     </Routes>
     <Footer/>
     
    </div>
  );
}

export default App;
