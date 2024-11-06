import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file

const InsertRegister = ({ usernameRef, passwordRef }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (username && password) {
            try {
                // Check if username is available
                const usernameCheckResponse = await fetch(`http://localhost:5000/register/check-username?username=${username}`);
                const usernameCheckData = await usernameCheckResponse.json();
    
                if (!usernameCheckData.available) {
                    setError('Username is already taken.');
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
    
                const data = await response.json();
    
                if (response.ok) {
                    navigate('/'); // Redirect to login or dashboard
                } else {
                    setError(data.message || 'Registration failed. Please try again.');
                }
            } catch (error) {
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
                        value={username}
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
                        value={password}
                        ref={passwordRef}
                        onChange={(e) => setPassword(e.target.value)}
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
