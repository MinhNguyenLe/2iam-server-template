import { Router } from "express";
import { googleAuth3m } from "service-oauth/oauth.middleware";
import {
  createTransaction,
  getListTransaction,
  removeTransaction,
  updateTransaction,
  changeTransactionTypeController,
} from "./transactions.controller";

const router: Router = Router();

router.get(
  "/transaction/get-by-filter-and-pagination",
  [googleAuth3m],
  getListTransaction
);
router.get("/transaction/create", [googleAuth3m], createTransaction);
router.get("/transaction/update", [googleAuth3m], updateTransaction);
router.get("/transaction/remove", [googleAuth3m], removeTransaction);
router.get(
  "/transaction/change-type",
  [googleAuth3m],
  changeTransactionTypeController
);

export default router;
