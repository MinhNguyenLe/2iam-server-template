import { Router } from "express";
import { getByUserIdController, insertErfjsController } from "./erfjs.controller";
import googleAuth from "@core/middlewares/googleAuth.middleware";

import { body } from "express-validator";
import {
  validatorString,
  validatorUrl,
  completeValidation,
  validatorArrayHaveItem,
} from "@core/middlewares/validator";
import { addCreatedAt, addUserId } from "@core/middlewares";

const router: Router = Router();

router.get("/erfjs/detail", getByUserIdController);
router.post(
  "/erfjs/insert",
  [
    googleAuth,
    validatorString(body("about_me.say_hi")).notEmpty(),
    validatorString(body("about_me.about_1")).notEmpty(),
    validatorString(body("about_me.about_2")),
    validatorUrl(body("about_me.social_link.*")),
    validatorArrayHaveItem(body("experience")),
    validatorString(body("experience.*.title")).notEmpty(),
    validatorString(body("experience.*.date")).notEmpty(),
    validatorArrayHaveItem(body("experience.*.details")),
    validatorString(body("experience.*.details.*")).notEmpty(),
    completeValidation,
    addCreatedAt,
    addUserId,
  ],
  insertErfjsController
);

export default router;
