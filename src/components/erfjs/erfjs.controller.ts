import { Request, Response } from "express";
import { getData } from "@components/erfjs/erfjs.service";

const getDataController = async (req: Request, res: Response) => {
  const data = await getData(req.query.username as string);
  res.send({ data });
};

export { getDataController };
