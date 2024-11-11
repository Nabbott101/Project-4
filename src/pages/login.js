import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');  // Set initial state for username
    const [password, setPassword] = useState('');  // Set initial state for password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle login request
    const handleLogin = async (e) => {
        e.preventDefault();  // Prevent the form from refreshing the page
        try {
            // Send login credentials to the backend (use the correct endpoint, typically /login)
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),  // Send username and password from state
            });

            const data = await response.json();  // Parse response as JSON

            if (response.ok) {
                localStorage.setItem('username', username);                
                console.log('Login successful:', { username });
                navigate('/dashboard');  // Redirect to dashboard or home page
            } else {
                setError(data.message || 'Invalid username or password.');
            }
        } catch (error) {
            setError('An error occurred. Please try again later.');
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="form">
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        defaultValue={username}  // Use state value
                        onChange={(e) => setUsername(e.target.value)}  // Update state on input change
                        required
                        className="input"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        defaultValue={password}  // Use state value
                        onChange={(e) => setPassword(e.target.value)}  // Update state on input change
                        required
                        className="input"
                    />
                </div>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="button">Login</button>
            </form>
            <p>Don't have an account? <Link to="/pages/InsertRegister">Register here</Link></p>
        </div>
    );
};

export default Login;
