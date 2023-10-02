import { Router } from "express";
import { getDataController } from "./erfjs.controller";

const router: Router = Router();
router.get("/erfjs", getDataController);

export default router;
