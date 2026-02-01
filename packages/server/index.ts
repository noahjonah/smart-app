import dotenv from 'dotenv';
import express from 'express';
import route from './routes';

dotenv.config();

const app = express();
app.use(express.json()); // Allows the parsing of JSON bodies in the requests
app.use(route);

const port = process.env.PORT || 3000;

app.listen(port, () => {
   console.log(`Our Smart Server is running on http://localhost:${port}`);
});
