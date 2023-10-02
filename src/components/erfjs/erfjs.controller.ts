import { Request, Response } from "express";
import httpStatus from "http-status";
import { getData } from "@components/erfjs/erfjs.service";
import { IUser } from "@components/user/user.interface";

const getDataController = async (req: Request, res: Response) => {
  const data = await getData(req.query.userId as string);
  res.send({ data });
};

export { getDataController };
