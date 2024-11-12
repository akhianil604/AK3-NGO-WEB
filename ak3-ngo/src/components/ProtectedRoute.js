import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

// Function to check authentication (e.g., valid JWT in sessionStorage)
const isAuthenticated = (role) => {
  const token = sessionStorage.getItem('authToken')
  if (token) {
    const decoded = jwtDecode(token);
    // console.log(decoded);
    const expiry = decoded.exp * 1000; // exp is in seconds, convert to milliseconds
  
    if (expiry >= Date.now() && decoded.role === role) {
      return true;
    } 
  }
  return false
};

const ProtectedRoute = ({ children, redirectPath, role}) => {
  return isAuthenticated(role) ? children : <Navigate to={redirectPath} replace />;
};



export default ProtectedRoute;
