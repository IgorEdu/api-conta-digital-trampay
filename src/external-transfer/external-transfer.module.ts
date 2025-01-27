import { Module } from '@nestjs/common';
import { ExternalTransferService } from './external-transfer.service';
import { ExternalTransferController } from './external-transfer.controller';
import { AuthorizationService } from '../transfer/authorization.service';
import { AccountModule } from '../account/account.module';
import { ExternalTransferRepository } from './external-transfer.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExternalTransfer } from './external-transfer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExternalTransfer]), AccountModule],
  controllers: [ExternalTransferController],
  providers: [ExternalTransferRepository, ExternalTransferService, AuthorizationService],
})
export class ExternalTransferModule {}
