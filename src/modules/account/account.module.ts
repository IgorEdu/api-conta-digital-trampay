import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { AccountRepository } from './account.repository';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  providers: [AccountRepository, AccountService],
  exports: [AccountService],
  controllers: [AccountController],
})
export class AccountModule {}
