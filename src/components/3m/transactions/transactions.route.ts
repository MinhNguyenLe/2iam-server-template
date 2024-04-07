import { Router } from "express";
import { googleAuth3m } from "service-oauth/oauth.middleware";
import {
  createTransaction,
  getTotalValue,
  removeTransaction,
  updateTransaction,
  changeTransactionTypeController,
  getListTransactionByPaginationAndFilter,
  getReportMonthly,
  locallyController,
  getJARSController,
} from "./transactions.controller";

const router: Router = Router();

router.get(
  "/transaction/get-total-value-by-filter",
  [googleAuth3m],
  getTotalValue
);
router.get(
  "/transaction/get-by-filter-and-pagination",
  [googleAuth3m],
  getListTransactionByPaginationAndFilter
);
router.post("/transaction/create", [googleAuth3m], createTransaction);
router.post("/transaction/update", [googleAuth3m], updateTransaction);
router.post("/transaction/remove", [googleAuth3m], removeTransaction);
router.post(
  "/transaction/change-type",
  [googleAuth3m],
  changeTransactionTypeController
);
router.get("/transaction/report-monthly", [googleAuth3m], getReportMonthly);
router.get("/transaction/get-jars", [googleAuth3m], getJARSController);

router.get("/locally", locallyController);

export default router;
