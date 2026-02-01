import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import { chatController } from './controllers/chat.controller';

dotenv.config();

const app = express();
app.use(express.json()); // Allows the parsing of JSON bodies in the requests
const port = process.env.PORT || 3000;

app.post('/api/chat', chatController.sendMessage);

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
