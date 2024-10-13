import express from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import TransactionController from "../controllers/transaction-controller";

const routeTransaction = express.Router();

routeTransaction.use(authMiddleware);

routeTransaction.get(
  "/balance",
  authMiddleware,
  TransactionController.getBalance
);
routeTransaction.post("/topup", authMiddleware, TransactionController.topUp);
routeTransaction.post(
  "/payment",
  authMiddleware,
  TransactionController.payment
);
routeTransaction.get(
  "/transaction/history",
  authMiddleware,
  TransactionController.history
);

export default routeTransaction;
