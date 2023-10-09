// @ts-nocheck

import { Request, Response, NextFunction } from "express";

export const addCreatedAt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.dataValidated.createdAt = new Date();

  next();
};

export const addUserId = (req: Request, res: Response, next: NextFunction) => {
  req.dataValidated.userId = req.user.id;

  next();
};
