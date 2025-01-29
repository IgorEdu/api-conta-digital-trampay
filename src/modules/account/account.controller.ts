import { plainToInstance } from 'class-transformer';
import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountDto } from './dto/account.dto';
import { AccountService } from './account.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';

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

  // @Get(':accountId/balance')
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // @HttpCode(HttpStatus.OK)
  // async getBalance(@Param('accountId') accountId: string): Promise<number> {
  //   const balance = await this.accountService.getBalance(accountId);
  //   return balance;
  // }

  @Get('/balance')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getBalance(@Request() request): Promise<number> {
    const userId = request.userInfo.userId;

    const account = await this.accountService.getAccountByUserId(userId);
    const accountId = account?.userId;

    if(!accountId){
      throw new BadRequestException();
    }

    const balance = await this.accountService.getBalance(accountId);
    return balance;
  }
}