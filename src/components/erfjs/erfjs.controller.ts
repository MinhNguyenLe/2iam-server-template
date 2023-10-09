import { Request, Response } from "express";
import { getByUserId, insertErfjs } from "@components/erfjs/erfjs.service";

const getByUserIdController = async (req: Request, res: Response) => {
  const data = await getByUserId(req.query.username as string);
  res.send({ data });
};

const insertErfjsController = async (req: Request, res: Response) => {
  // @ts-ignore
  await insertErfjs(req.dataValidated);
  res.status(200).send({ message: "Successful" });
};

export { getByUserIdController, insertErfjsController };
