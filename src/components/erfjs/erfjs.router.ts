import { Router } from "express";
import { getDataController } from "./erfjs.controller";
import googleAuth from "@core/middlewares/googleAuth.middleware";

const router: Router = Router();

router.get("/erfjs", [googleAuth], getDataController);

export default router;
