import { Router } from "express";

import "./mongo";
// main();

import healthCheck from "@components/healthcheck/healthCheck.router";
import user from "@components/user/user.router";

import erfjs from "@components/erfjs/erfjs.router";

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(erfjs);

export default router;
