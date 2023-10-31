// @ts-nocheck
import config from "@config/config";
import { Router } from "express";
import passport from "passport";

const router: Router = Router();

router.get(
  "/auth/3m/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/auth/3m/google/callback",
  passport.authenticate("google", {
    successRedirect: config.url3m,
    failureRedirect: "/api/sign-in/failure",
  })
);

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
router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    // state: "SOME STATE",
  })
);
router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "http://localhost:4444/dashboard",
    failureRedirect: "/api/sign-in/failure",
  })
);
router.post("/logout", (req, res, next) => {
  req.session = null;
  res.status(200).json({
    message: "Log out successful",
  });
});
router.get("/sign-in/failure", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Log in failure",
  });
});

export default router;
