import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './modules/account/account.module';
import { TransferModule } from './modules/transfer/transfer.module';
import { ExternalTransferModule } from './modules/external-transfer/external-transfer.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';

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
  ExternalTransferModule,
  AuthModule],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
