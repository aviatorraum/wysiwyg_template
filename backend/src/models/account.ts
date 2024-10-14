export class Account {
  constructor(public id: string, public name: string, public balance: number) {
    if (balance < 0) {
      throw new Error('Initial balance cannot be negative.');
    }
  }
}
