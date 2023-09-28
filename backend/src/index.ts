import express, { Express, Request, Response } from "express";
import errorHandler from './middleware/errorHandler' 
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

// Config 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


import userRouter from "./router/user";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/user", userRouter);



app.use(errorHandler)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
