import { Router } from "express";
import "./mongo";
import { Request, Response } from "express";

import healthCheck from "@components/healthcheck/healthCheck.router";
import user from "@components/user/user.router";
import erfjs from "@components/erfjs/erfjs.router";
import passport from "passport";
import UsersModel from "mongo/schema/users";
import googleAuth from "@core/middlewares/googleAuth.middleware";

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(erfjs);

router.get("/iam", [googleAuth], async (req: Request, res: Response) => {
  // @ts-ignore
  const data = await UsersModel.findOne({ _id: req.user.id });

  if (!data) {
    res.status(401).send({ message: "User not found. Please sign in." });
  }
  res.status(200).send({ data });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:4444/dashboard",
    failureRedirect: "/api/sign-in/failure",
  })
);

router.get("/sign-in/failure", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

export default router;
