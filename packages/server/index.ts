import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import express from 'express';
import z from 'zod';
import { chatService } from './services/chat.service';

dotenv.config();

const app = express();
app.use(express.json()); // Allows the parsing of JSON bodies in the requests
const port = process.env.PORT || 3000;

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

   try {
      const { prompt, conversationId } = request.body;
      const chatReply = await chatService.sendMessage(prompt, conversationId);

      response.json({ ai_response: chatReply.message });
   } catch (error) {
      response
         .status(500)
         .json({ error: 'An error occurred while processing your request.' });
   }
});

app.get('/api/hello', (req: Request, res: Response) => {
   res.json({ message: 'Hello from the backend express server!' });
});

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
