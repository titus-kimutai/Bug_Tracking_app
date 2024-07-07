// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/loginPage/login';
import Register from './pages/registerPage/register';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;
