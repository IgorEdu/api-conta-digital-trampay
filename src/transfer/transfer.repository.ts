import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './transfer.entity';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransferRepository {
  constructor(
    private readonly dataSource: DataSource,
    private readonly accountService: AccountService,
  ) {}

  async executeTransfer(dto: CreateTransferDto): Promise<boolean> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const transfer = new Transfer();
      transfer.accountSender = dto.accountSender;
      transfer.accountReceiver = dto.accountReceiver;
      transfer.amount = Number(dto.amount);
      transfer.status = 'completed';

      // Perform the debit and credit operations within the transaction
      await this.accountService.debit(
        dto.accountSender,
        Number(dto.amount),
        queryRunner.manager,
      );
      await this.accountService.credit(
        dto.accountReceiver,
        Number(dto.amount),
        queryRunner.manager,
      );

      await queryRunner.manager.save(transfer);

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
