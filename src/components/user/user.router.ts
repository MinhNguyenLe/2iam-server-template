import { Router } from "express";

import protectedByApiKey from "@core/middlewares/apiKey.middleware";
import validation from "@core/middlewares/validate.middleware";
import {
  createUser,
  readUser,
  updateUser,
  deleteUser,
  updateResume,
} from "./user.controller";
import createUserValidation from "./createUser.validation";

const router: Router = Router();

router.post(
  "/user/",
  [protectedByApiKey, validation(createUserValidation)],
  createUser
);
router.get("/user/:id", readUser);
router.put("/user/:id", [protectedByApiKey], updateUser);
router.delete("/user/:id", [protectedByApiKey], deleteUser);

router.post("/users/update-resume", updateResume);

export default router;
