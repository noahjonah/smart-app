import express from 'express';
import { chatController } from './controllers/chat.controller';

const route = express.Router();

route.post('/api/chat', chatController.sendMessage);

export default route;
