import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
   res.send(`Hello from Our Smart Server! ${process.env.OPENAI_API_KEY}`);
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
