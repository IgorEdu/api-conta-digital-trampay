import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { TransferRepository } from './transfer.repository';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { AccountModule } from '../account/account.module'; 
import { AuthorizationService } from './authorization.service';


@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), AccountModule],
  providers: [TransferRepository, TransferService, AuthorizationService],
  exports: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
