export class TransactionLog {
  constructor(
    public fromAccountId: string,
    public toAccountId: string,
    public amount: number,
    public timestamp: Date
  ) {}
}
