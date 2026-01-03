import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the bun server package!");
});

app.listen(port, () => {
  console.log(`Our Smart Server is running on http://localhost:${port}`);
});
