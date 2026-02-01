import type { Request, Response } from 'express';
import { chatService } from '../services/chat.service';
import z from 'zod';

// Implementation details(library for validation)
const chatRequestSchema = z.object({
   prompt: z
      .string()
      .trim()
      .min(1, 'Prompt cannot be empty')
      .max(1000, 'Prompt is too long'),
   conversationId: z.string().uuid(),
});

// Public interface
export const chatController = {
   sendMessage: async (request: Request, response: Response) => {
      const parseResult = chatRequestSchema.safeParse(request.body);

      if (!parseResult.success) {
         return response
            .status(400)
            .json({ errors: parseResult.error.format() });
      }

      try {
         const { prompt, conversationId } = request.body;
         const chatReply = await chatService.sendMessage(
            prompt,
            conversationId
         );

         response.json({ ai_response: chatReply.message });
      } catch (error) {
         response.status(500).json({
            error: 'An error occurred while processing your request.',
         });
      }
   },
};
