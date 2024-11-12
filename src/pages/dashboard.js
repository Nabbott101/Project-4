import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

// Initial data structure for categories and questions
const categories = [
    { 
        name: 'Frontend Development', 
        questions: [
            { question: 'What is React?', answer: 'React is a JavaScript library for building user interfaces.' },
            { question: 'What is JSX?', answer: 'JSX is a syntax extension for JavaScript, often used with React.' }
        ] 
    },
    { 
        name: 'Backend Development', 
        questions: [
            { question: 'What is Node.js?', answer: 'Node.js is a runtime environment for JavaScript outside the browser.' },
            { question: 'What is Express.js?', answer: 'Express.js is a web application framework for Node.js.' }
        ] 
    },
    { 
        name: 'Databases', 
        questions: [
            { question: 'What is SQL?', answer: 'SQL is a language used for managing relational databases.' },
            { question: 'What is NoSQL?', answer: 'NoSQL databases are used for unstructured data, unlike SQL databases.' }
        ] 
    },
    { 
        name: 'DevOps', 
        questions: [
            { question: 'What is CI/CD?', answer: 'CI/CD stands for Continuous Integration and Continuous Delivery.' },
            { question: 'What is Docker?', answer: 'Docker is a tool for automating deployment inside lightweight containers.' }
        ] 
    },
    { 
        name: 'Agile Methodology', 
        questions: [
            { question: 'What is Agile?', answer: 'Agile is an iterative approach to software development and project management.' },
            { question: 'What is Scrum?', answer: 'Scrum is a framework for Agile project management.' }
        ] 
    },
];

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');

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
    


    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('password');
        navigate('/'); // Redirect to the login page
    };

    // Handle category click
    const handleCategoryClick = (category) => {
        setSelectedCategory(category); // Set selected category
    };

    // Add question handler
    const handleAddQuestion = () => {
        if (!newQuestion || !newAnswer) {
            setError('Please provide both a question and an answer.');
            return;
        }

        // Create new question object
        const newQuestionObject = { question: newQuestion, answer: newAnswer };

        // Add the new question to the selected category's questions
        const updatedCategory = { ...selectedCategory };
        updatedCategory.questions.push(newQuestionObject);

        // Update the state
        setSelectedCategory(updatedCategory);
        setNewQuestion('');
        setNewAnswer('');
        setError('');
    };

    // Delete question handler
    const handleDeleteQuestion = (questionIndex) => {
        const updatedCategory = { ...selectedCategory };
        updatedCategory.questions.splice(questionIndex, 1); // Remove the question by index

        // Update the state
        setSelectedCategory(updatedCategory);
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

                {/* Render selected category's questions */}
                {selectedCategory ? (
                    <>
                        <h3>{selectedCategory.name}</h3>
                        <div>
                            {selectedCategory.questions.map((q, index) => (
                                <div key={index} className="question">
                                    <h4>{q.question}</h4>
                                    <p>{q.answer}</p>
                                    {/* Delete button for each question */}
                                    <button
                                        onClick={() => handleDeleteQuestion(index)}
                                        className="delete-button"
                                    >
                                        Delete Question
                                    </button>
                                </div>
                            ))}
                        </div>
                        {/* Add question form */}
                        <div className="add-question-container">
                            <h4>Add a New Question and Answer</h4>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter question"
                                    value={newQuestion}
                                    onChange={(e) => setNewQuestion(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Enter answer"
                                    value={newAnswer}
                                    onChange={(e) => setNewAnswer(e.target.value)}
                                    className="input"
                                />
                            </div>
                            {error && <p className="error">{error}</p>}
                            <button onClick={handleAddQuestion} className="button">
                                Add Question
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Select a category to see the questions.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;