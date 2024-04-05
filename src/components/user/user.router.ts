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
import googleAuth from "service-oauth/oauth.middleware";
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
    body("resume.iam.position").optional().isString(),
    body("resume.iam.full_name").optional().isString(),
    body("resume.iam.nickname").optional().isString(),
    body("resume.iam.image").optional().isString(),

    body("resume.contact.object_title").optional().isString(),
    body("resume.contact.email").optional().isEmail(),
    body("resume.contact.number_phone").optional().isMobilePhone(),
    body("resume.contact.address").optional().isString(),
    body("resume.contact.email_service").optional().isEmail(),
    body("resume.contact.current_company").optional().isString(),
    body("resume.contact.website")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),
    body("resume.contact.social_media").optional().isArray(),
    body("resume.contact.social_media.*.name").optional().isString(),
    body("resume.contact.social_media.*.icon").optional().isString(),
    body("resume.contact.social_media.*.link")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),

    body("resume.educations.object_title").optional().isString(),

    body("resume.educations.lists").optional().isArray(),
    body("resume.educations.lists.*.learning_time").optional().isString(),
    body("resume.educations.lists.*.major").optional().isString(),
    body("resume.educations.lists.*.score").optional().isString(),
    body("resume.educations.lists.*.status").optional().isString(),
    body("resume.educations.lists.*.training_place.name").optional().isString(),
    body("resume.educations.lists.*.training_place.link")
      .optional()
      .isString()
      .isURL({ protocols: ["https", "http"] }),

    body("resume.educations.lists.*.details").optional().isArray(),
    body("resume.educations.lists.*.details.*.paragraph").optional().isString(),

    body("resume.experiences.object_title").optional().isString(),
    body("resume.experiences.lists").optional().isArray(),
    body("resume.experiences.lists.*.period").optional().isString(),
    body("resume.experiences.lists.*.position").optional().isString(),
    body("resume.experiences.lists.*.skills").optional().isString(),

    body("resume.experiences.lists.*.details").optional().isArray(),
    body("resume.experiences.lists.*.details.*.paragraph").optional().isString(),

    body("resume.experiences.lists.*.details.*.lists").optional().isArray(),
    body("resume.experiences.lists.*.details.*.lists.*.content").optional().isString(),

    body("resume.summary.object_title").optional().isString(),

    body("resume.summary.details").optional().isArray(),
    body("resume.summary.details.*.paragraph").optional().isString(),

    body("resume.summary.details.*.lists").optional().isArray(),
    body("resume.summary.details.*.lists.*.content").optional().isString(),

    body("resume.skills.object_title").optional().isString(),

    body("resume.skills.lists").optional().isArray(),
    body("resume.skills.lists.*.name").optional().isString(),
    body("resume.skills.lists.*.score").optional().isString(),

    completeValidation,
  ],
  updateResume
);

export default router;
