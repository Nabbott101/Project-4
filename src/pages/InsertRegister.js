import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const InsertRegister = ({ usernameRef, passwordRef }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // New state for confirm password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        // Regex for minimum 8 characters and at least one number
        const regex = /^(?=.*\d).{8,}$/;
        return regex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        // Validate password
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and contain at least one number.');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (username && password) {
            try {
                // Check if username is available
                const usernameCheckResponse = await fetch(`http://localhost:5000/register/check-username?username=${username}`);
                
                if (!usernameCheckResponse.ok) {
                    // If the response is not OK (e.g., 404 or 500 error), throw an error
                    throw new Error(`Error: ${usernameCheckResponse.statusText}`);
                }
                
                const usernameCheckData = await usernameCheckResponse.json();
    
                if (!usernameCheckData.available) {
                    setError('Username is already in use.');
                    return;
                }
    
                // Proceed with registration
                const response = await fetch('http://localhost:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });
    
                if (!response.ok) {
                    // Check if registration was successful
                    const data = await response.json();
                    setError(data.message || 'Registration failed. Please try again.');
                } else {
                    navigate('/'); // Redirect to login or dashboard
                }
    
            } catch (error) {
                console.error(error); // Log the error for debugging
                setError('An error occurred. Please try again later.');
            }
        } else {
            setError('Please fill in all fields.');
        }
    };

    return (
        <div className="container"> 
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="form"> 
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        defaultValue={username}
                        ref={usernameRef}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        defaultValue={password}
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="input" 
                    />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmPassword state
                        required
                        className="input"
                    />
                </div>
                {error && <p className="error">{error}</p>} 
                <button type="submit" className="button">Register</button> 
            </form>
            <p>Already have an account? <a href="/">Login here</a></p>
        </div>
    );
};

export default InsertRegister;