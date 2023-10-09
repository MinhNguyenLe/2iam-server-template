import { Router } from "express";
import { getTemplatesController } from "./templates.controller";
import googleAuth from "@core/middlewares/googleAuth.middleware";

const router: Router = Router();
router.get("/templates/all", [googleAuth], getTemplatesController);

export default router;
