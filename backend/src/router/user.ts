import express, { Express, Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {

    res.send("Hello, User");
});


export default router 