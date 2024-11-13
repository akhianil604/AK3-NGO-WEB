import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPortal from './components/User-Portal/User-Portal';
import PolicePortal from './components/Police-Portal/Police-Portal';
import NGOPortal from './components/NGO-Portal/NGO-Portal'; 
import HomePage from './components/Home-Page/Home-Page'
import SisterLogin from './components/NGO-Login/sister-login';
import PoliceLogin from './components/Police-Login/police-login';
import UserLogin from './components/User-Login/user-login';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return (
    // <div>
    //     <UserLogin/>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/user/login" element={<UserLogin/>} />
        <Route path="/sister-ngo/login" element={<SisterLogin/>} />
        <Route path="/police/login" element={<PoliceLogin/>} />
        <Route path="/user"
          element={
            <ProtectedRoute redirectPath="/user/login" role='user'>
              <UserPortal />
            </ProtectedRoute>
        }/>
        <Route path="/sister-ngo"
          element={
            <ProtectedRoute redirectPath="/sister-ngo/login" role='ngo'>
              <NGOPortal />
            </ProtectedRoute>
        }/>
        <Route path="/police"
          element={
            <ProtectedRoute redirectPath="/police/login" role='police'>
              <PolicePortal />
            </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
