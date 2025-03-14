import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './Signup/signup';
import Login from './Login/login';
import Dashboard from './Dashboard';
import Profile from './Profile/profile';
// import LoginForm from './LoginForm';










//preotected route component
const ProtectedRoute = ({children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    window.location.href ="http://localhost:3000/login";
    return null;
  }

  return children;
};

function App() {

  useEffect(() => {
    
    const healthCheck = () => {
      if (window.location.pathname === '/health') {
        document.body.textContent = 'OK';
      }
    };
    healthCheck();
    // Check if user is authenticated when dashboard loads
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated && window.location.pathname !== '/health') {
      window.location.href = 'http://localhost:3000/login';
    }
}, []);

  return (
    
    <div className="App">
  
       <Router>
      <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/dashboard" element={<Dashboard />} />
      <Route path='/profile' element={<Profile/>}/>

      <Route path="/dashboard/" element={<Dashboard />} />
      {/* <Route path="/dashboard/*" element={<Dashboard />} />  */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

      </Routes>
    </Router>

    </div>
  );
}

export default App;
