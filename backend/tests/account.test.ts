import { AccountService } from '../src/services/accountService';

describe('Account Service', () => {
  it('should create an account with initial balance', () => {
    const account = AccountService.createAccount('John Doe', 500);
    expect(account.name).toBe('John Doe');
    expect(account.balance).toBe(500);
  });

  it('should deposit money into the account', () => {
    const account = AccountService.createAccount('Alice', 1000);
    AccountService.deposit(account.id, 200);
    expect(AccountService.getAccount(account.id)?.balance).toBe(1200);
  });

  it('should not allow withdrawal if balance is insufficient', () => {
    const account = AccountService.createAccount('Bob', 100);
    expect(() => AccountService.withdraw(account.id, 200)).toThrowError(
      'Insufficient funds.'
    );
  });

  it('should withdraw money from the account', () => {
    const account = AccountService.createAccount('Eve', 1000);
    AccountService.withdraw(account.id, 400);
    expect(AccountService.getAccount(account.id)?.balance).toBe(600);
  });

  it('should transfer money between two accounts', () => {
    const accountA = AccountService.createAccount('Jack', 1000);
    const accountB = AccountService.createAccount('Jill', 100);

    AccountService.transfer(accountA.id, accountB.id, 400);
    expect(AccountService.getAccount(accountA.id)?.balance).toBe(600);
    expect(AccountService.getAccount(accountB.id)?.balance).toBe(500);
  });

  it('should not allow transfer if balance is insufficient', () => {
    const accountA = AccountService.createAccount('Mike', 100);
    const accountB = AccountService.createAccount('Sara', 500);

    expect(() =>
      AccountService.transfer(accountA.id, accountB.id, 200)
    ).toThrow('Insufficient funds.');
  });
});
