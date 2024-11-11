import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const categories = [
    { name: 'What is React?', question: 'React is a JavaScript library for building user interfaces, particularly for single-page applications (SPAs).' },
    { name: 'What is Node.js?', question: 'Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It is built on Chromes V8 JavaScript engine, which is known for its performance and efficiency.' },
    { name: 'What is SQL?', question: 'Structured query language (SQL) is a programming language for storing and processing information in a relational database. A relational database stores information in tabular form, with rows and columns representing different data attributes and the various relationships between the data values.' },
    { name: 'What is CI/CD?', question: 'CI/CD stands for continuous integration and continuous delivery, a set of practices that help software development teams deliver code updates more frequently and reliably. CI/CD is a key part of DevOps, which is a methodology that aims to improve collaboration between development and operations teams.' },
    { name: 'What is Agile methodology?', question: 'Agile methodology is a project management framework that emphasizes collaboration, flexibility, and improvement over following a strict plan.' },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedQuestion, setSelectedQuestion] = useState('');
    const [username, setUsername] = useState('');
    const [error] = useState('');

    // Get the username from localStorage when the component mounts
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            //fetchUserData(storedUsername);  // Fetch user data
        } else {
            navigate('/'); // If no username, redirect to login
        }
    }, [navigate]);

    const handleLogout = () => {
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
                {error && <p className="error">{error}</p>}
                <h1>Welcome, {username}!</h1>
            
                {selectedQuestion && <h3>{selectedQuestion}</h3>}
            </div>
        </div>
    );
};

export default Dashboard;