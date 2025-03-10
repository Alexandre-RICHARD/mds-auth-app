import express from 'express';
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';

app.use(express.json());

app.get('/', (req, res) => res.json("Auth app"))

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: 60 * 60 * 24 });
        return res.json({ token });
    }
    
    res.status(401).json({ message: 'Invalid credentials' });
});

app.listen(PORT, () => {
    console.log(`Auth service running on http://localhost:${PORT}`);
});
