import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('Login successful:', { username });
                navigate('/pages/dashboard'); // Redirect to a dashboard or home page
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
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value= {password}
                        onChange={(e) => setPassword(e.target.value)}
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
