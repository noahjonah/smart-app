import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';

dotenv.config();

// I am using Hugging Face's OpenAI-compatible API endpoint,
//  Avoiding openAI payments for now
const client = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HUGGINGFACE_API_KEY,
});

const app = express();
app.use(express.json()); // Allows the parsing of JSON bodies in the requests
const port = process.env.PORT || 3000;

app.post('/api/chat', async (request: Request, response: Response) => {
   const { prompt } = request.body;

   const chatCompletion = await client.chat.completions.create({
      model: 'meta-llama/Llama-3.1-8B-Instruct:cerebras',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 512,
   });

   const content_answer = chatCompletion.choices[0]?.message?.content ?? '';

   response.json({ response: content_answer });
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
