import { Request, Response } from 'express';
import { AccountService } from '../services/accountService';
import { TransactionService } from '../services/transactionService';

export const createAccount = (req: Request, res: Response) => {
  const { name, balance } = req.body;
  const account = AccountService.createAccount(name, balance);
  res.status(201).json(account);
};

export const getAccount = (req: Request, res: Response) => {
  const { id } = req.params;
  const account = AccountService.getAccount(id);
  res.status(200).json(account);
};

export const deposit = (req: Request, res: Response) => {
  const { id, amount } = req.body;
  AccountService.deposit(id, amount);
  res.status(200).json({ message: 'Deposit successful' });
};

export const withdraw = (req: Request, res: Response) => {
  const { id, amount } = req.body;
  AccountService.withdraw(id, amount);
  res.status(200).json({ message: 'Withdrawal successful' });
};

export const transfer = (req: Request, res: Response) => {
  const { fromId, toId, amount } = req.body;
  AccountService.transfer(fromId, toId, amount);
  TransactionService.logTransaction(fromId, toId, amount);
  res.status(200).json({ message: 'Transfer successful' });
};

export const getLogs = (req: Request, res: Response) => {
  const logs = TransactionService.getLogs();
  res.status(200).json(logs);
};
