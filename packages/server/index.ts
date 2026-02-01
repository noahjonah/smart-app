import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { OpenAI } from 'openai';
import z from 'zod';

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

const conversations = new Map<string, string>();

const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

app.post('/api/chat', async (request: Request, response: Response) => {
   const parseResult = chatRequestSchema.safeParse(request.body);

   if (!parseResult.success) {
      return response.status(400).json({ errors: parseResult.error.format() });
   }

   const { prompt, conversationId } = request.body;

   const chatReply = await client.responses.create({
      model: 'openai/gpt-oss-120b:fireworks-ai',
      input: prompt,
      max_output_tokens: 100,
      temperature: 0.2,
      previous_response_id: conversations.get(conversationId),
   });

   conversations.set(conversationId, chatReply.id);

   response.json({ ai_response: chatReply.output_text });
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
