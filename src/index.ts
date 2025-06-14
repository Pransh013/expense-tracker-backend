import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (_: Request, res: Response) => {
  res.json({ message: "Hello World!!!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
