import logger from "@core/utils/logger";
import { Response } from "express";

import AppError from "./appError";

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["handleError", "isTrustedError"] }] */
class ErrorHandler {
  public handleError(error: Error): void {
    logger.error(error);
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }

  public missingField(field: { field: any; name: string }, res: Response) {
    if (!field) res.status(400).send({ message: `Missing ${field.name}` });
  }
}

export default new ErrorHandler();
