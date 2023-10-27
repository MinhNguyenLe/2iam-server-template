import { Router } from "express";
const { body } = require("express-validator");

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
import googleAuth from "@core/middlewares/googleAuth.middleware";
import { completeValidation } from "@core/middlewares/validator";

const router: Router = Router();

router.post(
  "/user/",
  [protectedByApiKey, validation(createUserValidation)],
  createUser
);
router.get("/user/:id", readUser);
router.put("/user/:id", [protectedByApiKey], updateUser);
router.delete("/user/:id", [protectedByApiKey], deleteUser);

router.post(
  "/users/update-resume",
  [
    googleAuth,
    body("iam.position").optional().isString(),
    body("iam.full_name").optional().isString(),
    body("iam.nickname").optional().isString(),
    body("iam.image").optional().isString(),

    body("contact.object_title").optional().isString(),
    body("contact.email").optional().isEmail(),
    body("contact.number_phone").optional().isMobilePhone(),
    body("contact.address").optional().isString(),
    body("contact.email_service").optional().isEmail(),
    body("contact.current_company").optional().isString(),
    body("contact.website")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),
    body("contact.social_media").optional().isArray(),
    body("contact.social_media.*.name").optional().isString(),
    body("contact.social_media.*.icon").optional().isString(),
    body("contact.social_media.*.link")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),

    body("educations.object_title").optional().isString(),

    body("educations.lists").optional().isArray(),
    body("educations.lists.*.learning_time").optional().isString(),
    body("educations.lists.*.major").optional().isString(),
    body("educations.lists.*.score").optional().isString(),
    body("educations.lists.*.status").optional().isString(),
    body("educations.lists.*.training_place.name").optional().isString(),
    body("educations.lists.*.training_place.link")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),

    body("educations.lists.*.details").optional().isArray(),
    body("educations.lists.*.details.*.paragraph").optional().isString(),

    body("experiences.object_title").optional().isString(),
    body("experiences.lists").optional().isArray(),
    body("experiences.lists.*.period").optional().isString(),
    body("experiences.lists.*.position").optional().isString(),
    body("experiences.lists.*.skills").optional().isString(),

    body("experiences.lists.*.details").optional().isArray(),
    body("experiences.lists.*.details.*.paragraph").optional().isString(),

    body("experiences.lists.*.details.*.lists").optional().isArray(),
    body("experiences.lists.*.details.*.lists.*.content").optional().isString(),

    body("summary.object_title").optional().isString(),

    body("summary.details").optional().isArray(),
    body("summary.details.*.paragraph").optional().isString(),

    body("summary.details.*.lists").optional().isArray(),
    body("summary.details.*.lists.*.content").optional().isString(),

    body("skills.object_title").optional().isString(),

    body("skills.lists").optional().isArray(),
    body("skills.lists.*.name").optional().isString(),
    body("skills.lists.*.score").optional().isString(),

    completeValidation,
  ],
  updateResume
);

export default router;
