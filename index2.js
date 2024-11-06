import express from 'express';
import cors from 'cors';
import users from './routers/users.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use('/users',users);    // localhost:5000/departments
app.get('/',(req, res) => {             // localhost:5000
    res.send('howdy');
});
app.listen(5000, ()=> {
    console.log('listening at port 5000');
});