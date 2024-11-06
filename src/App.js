// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import InsertRegister from './pages/InsertRegister';
import Dashboard from './pages/dashboard'; 

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/pages/InsertRegister" element={<InsertRegister />} />
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard username={localStorage.getItem('username')} />} />
            </Routes> 
        </Router>
    );
};

export default App;
