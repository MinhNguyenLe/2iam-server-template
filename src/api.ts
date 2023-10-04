import { Router } from "express";
import "./mongo";

import healthCheck from "@components/healthcheck/healthCheck.router";
import user from "@components/user/user.router";
import erfjs from "@components/erfjs/erfjs.router";
import passport from "passport";

const router: Router = Router();
router.use(healthCheck);
router.use(user);
router.use(erfjs);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    console.log(req, "??");
    res.redirect("/");
  }
);

export default router;
