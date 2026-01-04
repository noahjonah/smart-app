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

let lastPromptId: string | null;

app.post('/api/chat', async (request: Request, response: Response) => {
   const { prompt } = request.body;

   const chatCompletion = await client.responses.create({
      model: 'openai/gpt-oss-120b:fireworks-ai',
      input: prompt,
      max_output_tokens: 200,
      temperature: 0.2,
      previous_response_id: lastPromptId,
   });

   lastPromptId = chatCompletion.id;
   // const content_answer = chatCompletion.choices[0]?.message?.content ?? '';

   response.json({ response: chatCompletion.output_text });
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
