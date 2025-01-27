import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './infra/config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { TransferModule } from './transfer/transfer.module';
import { ExternalTransferModule } from './external-transfer/external-transfer.module';

@Module({
  imports: [
    AccountModule,
    TransferModule,
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env'
  }),
  TypeOrmModule.forRootAsync({
    useClass: DbConfigService,
    inject: [DbConfigService]
  }),
  ExternalTransferModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
