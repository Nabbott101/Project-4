/*orginal code changed to below
import express from 'express';
import cors from 'cors';
import register from './router/register.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/register',register);        // localhost:5000/register
app.get('/',(req, res) => {             // localhost:5000
    res.send('howdy');
});
app.listen(5000, ()=> {
    console.log('listening at port 5000');
});*/

import express from 'express';
import cors from 'cors';
import registerRouter from './router/register.js'; // Include .js extension

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', registerRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
