import { DataSource, EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Account } from './account.entity';

@Injectable()
export class AccountRepository extends Repository<Account> {
  constructor(dataSource: DataSource) {
    super(Account, dataSource.manager);
  }

  async getAccount(accountId: string, manager?: EntityManager) {
    const queryRunner = manager ?? this.manager;
    return await queryRunner.findOneBy(Account, { id: accountId });
  }
  
  async saveAccount(account: Account, manager?: EntityManager) {
    const queryRunner = manager ?? this.manager;
    return await queryRunner.save(Account, account);
  }
}