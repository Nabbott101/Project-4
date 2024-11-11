import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const router = express.Router();

// Create MySQL pool with error handling
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb',
    waitForConnections: true, // Ensure the pool waits for connections
    connectionLimit: 10,
    queueLimit: 0
};

// Test the MySQL connection when initializing
const db = mysql.createPool(dbConfig);
async function testDbConnection() {
    try {
        await db.query('SELECT 1');
        console.log('Connected to MySQL database successfully.');
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
    }
}
testDbConnection(); // Call the test function
// Endpoint to check if username is available
router.get('/check-username', async (req, res) => {
    const { username } = req.query;
    if (!username) {
        return res.status(400).json({ available: false, message: 'Username is required.' });
    }

    const query = 'SELECT COUNT(*) AS count FROM users WHERE username = ?';
    
    try {
        const [results] = await db.execute(query, [username]);
        const count = results[0].count;
        return res.json({ available: count === 0 });
    } catch (err) {
        console.error('Error checking username:', err);
        return res.status(500).json({ available: false, message: 'Server error.' });
    }
});

// Endpoint to login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }
try {
        const query = 'SELECT password FROM users WHERE username = ?';
        const [results] = await db.execute(query, [username]);
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }

        const hashedPassword = results[0].password;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (isMatch) {
            return res.status(200).json({ message: 'Login successful.' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password.' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Login failed.' });
    }
});

export default router;