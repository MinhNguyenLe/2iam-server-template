// @ts-nocheck
import { Request, Response } from "express";
import gelalService from "@components/gelals/gelals.service";

const getByUserId = async (req: Request, res: Response) => {
  const data = await gelalService.getByUserId(req.query.userId as string);
  if (!data) {
    return res.status(400).send({ message: "Data not found" });
  }
  res.status(200).send({ data });
};


export { getByUserId };
