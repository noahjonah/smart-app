import OpenAI from 'openai';
import { conversationRepository } from '../repositories/conversation.repository';

// Implementation
const client = new OpenAI({
   baseURL: 'https://router.huggingface.co/v1',
   apiKey: process.env.HUGGINGFACE_API_KEY,
});

// type to fix leaky abstraction
type ChatResponse = {
   id: string;
   message: string;
};

// Public Interface
//! This is a leaky abstraction because it exposes OpenAI's response structure.
//! We can use a platform-agnostic interface for better abstraction.
export const chatService = {
   async sendMessage(
      prompt: string,
      conversationId: string
   ): Promise<ChatResponse> {
      const chatReply = await client.responses.create({
         model: 'openai/gpt-oss-120b:fireworks-ai',
         input: prompt,
         max_output_tokens: 100,
         temperature: 0.2,
         previous_response_id:
            conversationRepository.getLastResponseId(conversationId),
      });

      conversationRepository.setLastResponseId(conversationId, chatReply.id);
      return { id: chatReply.id, message: chatReply.output_text };
   },
};
