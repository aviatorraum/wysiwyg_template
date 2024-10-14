import { Account } from '../models/account';

export class AccountService {
  private static ACCOUNTS_KEY = 'banksys_accounts';
  private static loadAccounts(): Account[] {
    const accountsData = localStorage.getItem(AccountService.ACCOUNTS_KEY);
    return accountsData ? JSON.parse(accountsData) : [];
  }

  private static saveAccounts(accounts: Account[]): void {
    localStorage.setItem(AccountService.ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  static createAccount(name: string, initialBalance: number): Account {
    const id = `${name}_${Date.now()}`;
    const account = new Account(id, name, initialBalance);

    const accounts = AccountService.loadAccounts();
    accounts.push(account);
    AccountService.saveAccounts(accounts);
    return account;
  }

  static getAccount(id: string): Account | undefined {
    const accounts = AccountService.loadAccounts();
    return accounts.find((account) => account.id === id);
  }

  static deposit(id: string, amount: number): void {
    const accounts = AccountService.loadAccounts();
    const account = accounts.find((account) => account.id === id);
    if (!account) {
      throw new Error('Account not found.');
    }
    account.balance += amount;
    AccountService.saveAccounts(accounts);
  }

  static withdraw(id: string, amount: number): void {
    const accounts = AccountService.loadAccounts();
    const account = accounts.find((account) => account.id === id);
    if (!account) {
      throw new Error('Account not found.');
    }
    if (amount > account.balance) {
      throw new Error('Insufficient funds.');
    }
    account.balance -= amount;
    AccountService.saveAccounts(accounts);
  }

  static transfer(fromId: string, toId: string, amount: number): void {
    const accounts = AccountService.loadAccounts();
    const fromAccount = accounts.find((account) => account.id === fromId);
    const toAccount = accounts.find((account) => account.id === toId);

    if (!fromAccount || !toAccount) throw new Error('Account not found.');
    if (amount > fromAccount.balance) throw new Error('Insufficient funds.');

    fromAccount.balance -= amount;
    toAccount.balance += amount;
    AccountService.saveAccounts(accounts);
  }
}
