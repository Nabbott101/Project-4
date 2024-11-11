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
