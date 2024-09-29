import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import AuthToken from './components/AuthToken';
import Wallet from './components/Wallet';
import Payment from './components/Payment';
import Recharge from './components/Recharge';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/token" element={<AuthToken />} />
            <Route path="/wallet" element={<PrivateRoute />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/recharge" element={<Recharge />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

const PrivateRoute = () => {
  const { isTokenVerified } = useContext(AuthContext); 
  return isTokenVerified ? <Wallet /> : <Navigate to="/token" />;
};

export default App;
