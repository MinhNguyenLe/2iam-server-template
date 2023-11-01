// @ts-nocheck
import { Router } from "express";
import "./mongo";
import { Request, Response } from "express";
import { check3mFamily } from "utils";

// 3m repo
import transactions from "@components/3m/transactions/transactions.route";

import healthCheck from "@components/healthcheck/healthCheck.router";
import user from "@components/user/user.router";
import erfjs from "@components/erfjs/erfjs.router";
import gelal from "@components/gelals/gelals.router";

import templates from "@components/templates/templates.router";

import UsersModel from "mongo/schema/users";
import fileUpload from "express-fileupload";
import pdf from "pdf-parse";
import googleAuth, { googleAuth3m } from "service-oauth/oauth.middleware";

// import { OpenAI } from "langchain/llms/openai/";

import oauth from "service-oauth/oauth.route";

const router: Router = Router();

// 3m repo
router.use(transactions);

router.use(healthCheck);
router.use(user);
router.use(erfjs);
router.use(gelal);

router.use(oauth);

router.use(templates);

router.get("/started", (req: Request, res: Response) => {
  res.status(200).send("Hello");
});

// router.get("/test", async (req: Request, res: Response) => {
//   const model = new OpenAI({
//     temperature: 0.9,
//     openAIApiKey: "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",
//   });
//   const data = await model.call(
//     `I have string: const string = "\n\n  \nContact\nminh.nguyenle1809@gmail.com\n0706667411 (Mobile)\nminh.nguyenle1809@gmail.com\nwww.linkedin.com/in/minhlee2k\n(LinkedIn)\ngithub.com/MinhNguyenLe\n(Personal)\nTop Skills\nMeteor.js\nLeaflet\nTailwind CSS\nMinh Lee\nWeb Developer\nThủ Đức District, Ho Chi Minh City, Vietnam\nExperience\nbTaskee\nSoftware engineer\nDecember 2022 - Present (11 months)\nHo Chi Minh City, Vietnam\nManabie\nFrontend Developer\nApril 2022 - November 2022 (8 months)\nHo Chi Minh City, Vietnam\nInvoke in a Agile team which requires to join every meetings and processes.\nPick up Agile Epics, analyze, design, discuss with the Design Team, Product\nTeam to tackle them and write technical specification documents to clarify my\nwork.\nReview Code of the team to ensure code quality.\nCreate features and write unit test, BDD, automation test for them.\nRefactor legacy code.\nMISMART\nFrontend Developer\nOctober 2021 - March 2022 (6 months)\nHo Chi Minh City, Vietnam\nCheck multiple Drones's location and information every 100ms and render\nthem in a map. Make sure\nnot conflict with React pattern and state pattern (Redux).\nCustomize Table Component of MaterialUI to interact with user data.\nHandle Auth0 full flow.\nXtek\nFrontend Developer\nMay 2021 - September 2021 (5 months)\nHo Chi Minh City, Vietnam\nUse socket.io and react-streams package to display video streaming.\nGogoJungle Inc.\n \nPage 1 of 2\n\n  \n9 months\nFrontend Developer\nJuly 2020 - November 2020 (5 months)\nHo Chi Minh City, Vietnam\nFrontend Developer\nMarch 2020 - June 2020 (4 months)\nHo Chi Minh City, Vietnam\nEducation\nUniversity of Information Technology\n · (September 2018 - December 2022)\n \nPage 2 of 2"; Please help me convert into JSON, just key: information (name, email, phone,...), don't get experience or another`
//   );
//   console.log(data);
//   const codeRegex = /<div>(.*?)<\/div>/g;
//   const codeMatches = data.match(codeRegex);
//   if (codeMatches) {
//     // Join the extracted code into a single string
//     const code = codeMatches.join("");

//     // Remove any HTML tags if present
//     const result = code.replace(/<[^>]*>/g, "");

//     res.status(200).send({ data: result });
//   } else {
//     res.status(200).send({ data });
//   }
// });

router.get("/iam", [googleAuth], async (req: Request, res: Response) => {
  const data = await UsersModel.findOne({ _id: req.user.id });

  if (!data) {
    res.status(401).send({ message: "User not found. Please sign in." });
  }
  res.status(200).send({ user: data });
});

router.get("/3m/iam", [googleAuth3m], async (req: Request, res: Response) => {
  const data = await UsersModel.findOne({ _id: req.user.id });

  if (!data) {
    return res.status(401).send({ message: "User not found. Please sign in." });
  }
  if (!check3mFamily(data.oauth.google.emails[0].value)) {
    return res.status(401).send({ message: "User not found. Please sign in." });
  }

  return res.status(200).send({ user: data });
});

router.post("/convert-pdf", fileUpload(), async (req, res) => {
  const data = new Uint8Array(req.files.pdf.data);
  const pdfData = await pdf(data);

  res.status(200).send({ data: pdfData });
});

export default router;
