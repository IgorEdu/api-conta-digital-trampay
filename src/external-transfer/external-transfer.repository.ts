import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { CreateExternalTransferDto } from './dto/create-external-transfer.dto';
import { ExternalTransfer } from './external-transfer.entity';

@Injectable()
export class ExternalTransferRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountService: AccountService,
  ) {}

  async executeDeposit(dto: CreateExternalTransferDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const externalTransfer = new ExternalTransfer();
      const account =  await this.accountService.getAccount(dto.accountIdOrUserId);

      if (!account) {
        throw new Error('Conta não encontrada');
      }

      externalTransfer.accountId = account.id;
      externalTransfer.externalBank = dto.externalBank;
      externalTransfer.externalAgency = dto.externalAgency;
      externalTransfer.externalAccount = dto.externalAccount;
      externalTransfer.amount = Number(dto.amount);
      externalTransfer.type = 'deposit';
      externalTransfer.status = 'completed';

      await this.accountService.credit(
        account.id,
        Number(externalTransfer.amount),
        queryRunner.manager,
      );

      await queryRunner.manager.save(externalTransfer);

      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }

  async executePayment(dto: CreateExternalTransferDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const externalTransfer = new ExternalTransfer();
      const account =  await this.accountService.getAccount(dto.accountIdOrUserId);

      if (!account) {
        throw new Error('Conta não encontrada');
      }
      externalTransfer.accountId = account.id;

      externalTransfer.externalBank = dto.externalBank;
      externalTransfer.externalAgency = dto.externalAgency;
      externalTransfer.externalAccount = dto.externalAccount;
      externalTransfer.amount = Number(dto.amount);
      externalTransfer.type = 'payment';
      externalTransfer.status = 'completed';

      await this.accountService.debit(account.id, externalTransfer.amount);
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}
