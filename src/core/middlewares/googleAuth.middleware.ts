// @ts-nocheck
import { Request, Response, NextFunction } from "express";

const googleAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log("I am ", req.user);

  if (req.user) {
    next();
  } else {
    res.status(401).send("Not authenticated");
  }
};

export default googleAuth;
