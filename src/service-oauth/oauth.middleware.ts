import { Request, Response, NextFunction } from "express";

const googleAuth = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  console.log("I am ", req.user);

  if (req.user) {
    next();
  } else {
    res.status(401).send({ message: "Not authenticated" });
  }
};

export const googleAuth3m = (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    const email = req.user?.emails?.find((item) => item.verified);
    console.log(email);

    if (email.value === "leminh.nguyen@btaskee.com") {
      next();
    }
  }

  res.status(401).send({ message: "Not authenticated" });
};

export default googleAuth;
