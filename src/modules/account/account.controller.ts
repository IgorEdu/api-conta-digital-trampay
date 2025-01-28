import { plainToInstance } from 'class-transformer';
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountDto } from './dto/account.dto';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conta')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateAccountDto): Promise<AccountDto> {
    const account = await this.accountService.registerAccount(dto);
    return plainToInstance(AccountDto, account);
  }

  @Get(':accountId/balance')
  @HttpCode(HttpStatus.OK)
  async getBalance(@Param('accountId') accountId: string): Promise<number> {
    const balance = await this.accountService.getBalance(accountId);
    return balance;
  }
}