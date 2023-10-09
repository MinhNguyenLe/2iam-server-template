import { Request, Response } from 'express';
import httpStatus from 'http-status';

const healthCheck = (req: Request, res: Response) => {
  res.status(httpStatus.OK);
  res.send({ status: 'OK', data: new Date().toJSON() });
};

export default healthCheck;
