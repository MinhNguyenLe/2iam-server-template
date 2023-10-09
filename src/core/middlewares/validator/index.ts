import {
  ValidationChain,
  matchedData,
  validationResult,
} from "express-validator";
import { Request, Response, NextFunction } from "express";

export function validatorString(value: ValidationChain) {
  return value
    .optional()
    .isString()
    .withMessage("Must be string")
    .trim()
    .escape();
}

export function validatorEmail(value: ValidationChain) {
  return value
    .optional()
    .isString()
    .withMessage("Must be string")
    .trim()
    .isEmail()
    .withMessage("Must correct format Email");
}

export function validatorUrl(value: ValidationChain) {
  return value
    .optional()
    .isString()
    .withMessage("Must be string")
    .trim()
    .isURL({ protocols: ["https", "http"] })
    .withMessage("Must correct format URL");
}

export function validatorArrayHaveItem(value: ValidationChain) {
  return value.isArray({ min: 1 }).withMessage("Must be array and have at least 1 item");
}

export const completeValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  const data = matchedData(req);

  if (!result.isEmpty()) {
    return res.status(400).send({ errors: result.array() });
  }

  // @ts-ignore
  req.dataValidated = data;

  next();
};
