import { Request, Response } from "express";
import { getTemplates } from "@components/templates/templates.service";

const getTemplatesController = async (req: Request, res: Response) => {
  const templates = await getTemplates();
  res.send({ templates });
};

export { getTemplatesController };
