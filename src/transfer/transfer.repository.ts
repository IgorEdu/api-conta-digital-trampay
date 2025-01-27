import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { Transfer } from './transfer.entity';
import { AccountService } from 'src/account/account.service';

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

      // Commit the transaction
      await queryRunner.commitTransaction();

      return true;
    } catch (error) {
      // Rollback the transaction in case of an error
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
