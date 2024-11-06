// src/Dashboard.js
/*import React from 'react';

const Dashboard = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Dashboard</h2>
            <p>Welcome to the Dashboard!</p>
            <a href="/">Login page</a>
        </div>
    );
};

export default Dashboard;
*/

// Dashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const categories = [
    { name: 'Frontend Development', question: 'What is React?' },
    { name: 'Backend Development', question: 'What is Node.js?' },
    { name: 'Databases', question: 'What is SQL?' },
    { name: 'DevOps', question: 'What is CI/CD?' },
    { name: 'General', question: 'What is Agile methodology?' },
];

const Dashboard = ({ username }) => {
    const navigate = useNavigate();
    const [selectedQuestion, setSelectedQuestion] = useState('');

    const handleLogout = () => {
        // Optionally, clear localStorage or any authentication state
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/'); // Redirect to the login page
    };

    const handleCategoryClick = (category) => {
        setSelectedQuestion(category.question);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <h2>Categories</h2>
                {categories.map((category, index) => (
                    <button 
                        key={index} 
                        onClick={() => handleCategoryClick(category)} 
                        className="category-button"
                    >
                        {category.name}
                    </button>
                ))}
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
            <div className="main-content">
                <h1>Welcome, {username}!</h1>
                {selectedQuestion && <h3>{selectedQuestion}</h3>}
            </div>
        </div>
    );
};

export default Dashboard;
