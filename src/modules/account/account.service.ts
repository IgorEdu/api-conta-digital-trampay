import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { EntityManager } from 'typeorm';
import { AccountRepository } from './account.repository';
import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async getAccount(identifier: string): Promise<Account | null> {
    return this.accountRepository.findOne({
      where: [{ id: identifier }, {userId: identifier}]
    });
  }

  async registerAccount(dto: CreateAccountDto): Promise<Account> {
    const { userId } = dto;
    // const existingAccount = await this.accountRepository.findOne({
    //   where: [{ cpfCnpj }, { userId }],
    // });

    const existingAccount = await this.accountRepository.findOne({
      where: [{ userId }],
    });

    if (existingAccount) {
      throw new BadRequestException('Usuário já possui conta cadastrada');
    }

    // const hashedPassword = await hashPassword(dto.password);

    // const account = this.accountRepository.create({
    //   ...dto,
    //   password: hashedPassword,
    // });

    const accountData = this.accountRepository.create({
      ...dto,
      balance: dto.balance ?? 0,
    });

    const account = this.accountRepository.create(accountData);

    return this.accountRepository.save(account);
  }

  async updateAccount(account: Account, manager?: EntityManager): Promise<Account> {
    return this.accountRepository.saveAccount(account, manager);
  }

  async getBalance(accountId: string): Promise<number> {
    const account = await this.getAccount(accountId);
    if (!account) {
      throw new BadRequestException('Conta não encontrada');
    }
    return account.balance;
  }

  async debit(accountId: string, amount: number, manager?: EntityManager) {
    const account = await this.getAccount(accountId);
    if (!account) {
      throw new BadRequestException('Conta não encontrada');
    }

    if (account.balance < amount) {
      throw new BadRequestException('Saldo insuficiente');
    }

    account.balance = Number(account.balance) - amount;
    await this.updateAccount(account, manager);
  }

  async credit(accountId: string, amount: number, manager?: EntityManager) {
    // const account = await this.getAccount(accountId);
    // if (!account) {
    //   throw new BadRequestException('Conta não encontrada');
    // }
    
    // account.balance += amount;
    // await this.updateAccount(account, manager);

    const account = await this.getAccount(accountId);
    if (!account) {
      throw new BadRequestException('Conta não encontrada');
    }

    account.balance = Number(account.balance) + amount;
    await this.updateAccount(account, manager);
  }

  async getAccountByUserId(userId: string){
    return await this.accountRepository.findOne({
      where: [{ userId }],
    });
  }
} 