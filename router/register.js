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









/*My original code- Usman assistance to code above
import express from 'express';
import mysql from 'mysql2/promise'; // Use promise-based MySQL
import bcrypt from 'bcrypt'; // Make sure to import bcrypt
const router = express.Router();

// Create MySQL pool
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

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


// Export the router
export default router;

/*Karl's code sample
import express from 'express';
import mysql from 'mysql2';
const router = express.Router()
// connecting Database
const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mydb"
});  

/*************************************************************************
 * QUERY (POST) INDIVIDUAL
 *************************************************************************/
/*router.post("/", async (req, res) => {       // localhost:5000/register [POST}]
  try {
      const {username} = req.body;
      const data =  await connection.promise().query(
        `SELECT *  from USERS WHERE USERNAME=?;`,[username]
      );
      console.log(`data[0]=${JSON.stringify(data[0])}`)
      res.status(202).json({  // res.send(data)
        users: data[0]
      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});

/*************************************************************************
 * INSERT (POST) INDIVIDUAL
 *************************************************************************/
/*router.post("/register2", async (req, res) => {       // localhost:5000/register/register2 [POST}]
  try {
      const {username} = req.body;
      const {password} = req.body;
      console.log(`username=${username}, password=${password}`)

      const data =  await connection.promise().query(
        `INSERT INTO users VALUES (?,?)`,[username,password]
      );
      console.log(`data[0]=${JSON.stringify(data[0])}`)
      res.status(202).json({  // res.send(data)
        users: data[0]
      });
    } catch (err) {
      res.status(500).json({
        message: err
      });
    }
});


export default router;*/