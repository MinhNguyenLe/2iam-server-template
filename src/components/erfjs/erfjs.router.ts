import { Router } from "express";

// import protectedByApiKey from "@core/middlewares/apiKey.middleware";
import { getDataController } from "./erfjs.controller";

const router: Router = Router();

router.get("/erfjs", getDataController);
// router.put("/user/:id", [protectedByApiKey], updateUser);
// router.delete("/user/:id", [protectedByApiKey], deleteUser);

export default router;
