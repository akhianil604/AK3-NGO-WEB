import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPortal from './components/User-Portal/User-Portal';
import PolicePortal from './components/Police-Portal/Police-Portal';
import NGOPortal from './components/NGO-Portal/NGO-Portal'; 
import HomePage from './components/Home-Page/Home-Page'
import SisterLogin from './components/NGO-Login/sister-login';
import PoliceLogin from './components/Police-Login/police-login';
import UserLogin from './components/User-Login/user-login';

function App(){
  return (
    // <div>
    //     <UserLogin/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}></Route>
        <Route path="/user/login" element={<UserLogin/>}></Route>
        <Route path="/sister-ngo/login" element={<SisterLogin/>}></Route>
        <Route path="/police/login" element={<PoliceLogin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
