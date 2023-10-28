import express, { Express, Request, Response } from "express";
import errorHandler from "./middleware/errorHandler";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

//@Express Config
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//@Route
import userRouter from "./router/user";
import chatRouter from "./router/chat";
import messageRouter from "./router/message";

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/user", userRouter);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
