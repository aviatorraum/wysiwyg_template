import { TransactionLog } from '../models/transaction';

const transactionLogs: TransactionLog[] = [];

export class TransactionService {
  static logTransaction(fromId: string, toId: string, amount: number): void {
    const log = new TransactionLog(fromId, toId, amount, new Date());
    transactionLogs.push(log);
  }

  static getLogs(): TransactionLog[] {
    return transactionLogs;
  }
}
