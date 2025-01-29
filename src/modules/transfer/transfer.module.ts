import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transfer } from './transfer.entity';
import { TransferRepository } from './transfer.repository';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { AccountModule } from '../account/account.module';
import { MockAuthorizationService } from 'src/authorization/mock-authorization.service';


@Module({
  imports: [TypeOrmModule.forFeature([Transfer]), AccountModule],
  providers: [TransferRepository, TransferService, MockAuthorizationService],
  exports: [TransferService],
  controllers: [TransferController],
})
export class TransferModule {}
