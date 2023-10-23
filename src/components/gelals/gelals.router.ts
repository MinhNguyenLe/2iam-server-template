import { Router } from "express";
import { getByUserId} from "./gelals.controller";

const router: Router = Router();

router.get("/gelals/detail", getByUserId);

export default router;
