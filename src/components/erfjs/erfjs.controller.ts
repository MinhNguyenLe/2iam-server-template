// @ts-nocheck
import { Request, Response } from "express";
import erfjsService from "@components/erfjs/erfjs.service";

const getByUserId = async (req: Request, res: Response) => {
  const data = await erfjsService.getByUserId(req.query.userId as string);
  if (!data) {
    return res.status(400).send({ message: "Data not found" });
  }
  res.status(200).send({ data });
};

const verifyDuplicate = async (req: Request, res: Response) => {
  const isDuplicate = await erfjsService.verifyDuplicate(req.user.id);
  if (isDuplicate) {
    return res.status(400).send({ message: "User had this template" });
  }
  res.status(200).send({ message: "Do not duplicate" });
};

const insertErfjs = async (req: Request, res: Response) => {
  await erfjsService.insertErfjs(req.dataValidated);
  res.status(200).send({ message: "Successful" });
};

export { getByUserId, insertErfjs, verifyDuplicate };
