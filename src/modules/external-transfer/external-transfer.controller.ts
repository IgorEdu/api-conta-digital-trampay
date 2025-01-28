import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ExternalTransferService } from './external-transfer.service';
import { CreateExternalTransferDto } from './dto/create-external-transfer.dto';
import { UpdateExternalTransferDto } from './dto/update-external-transfer.dto';
import { plainToInstance } from 'class-transformer';
import { ExternalTransferDto } from './dto/external-transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transferência Externa')
@Controller('external-transfer')
export class ExternalTransferController {
  constructor(private readonly externalTransferService: ExternalTransferService) {}

  @Post('deposit')
  @HttpCode(HttpStatus.CREATED)
  async createDeposit(@Body() createExternalTransferDto: CreateExternalTransferDto) {
    const externalTransfer = await this.externalTransferService.deposit(createExternalTransferDto);
    return plainToInstance(ExternalTransferDto, externalTransfer);
  }

  @Post('payment')
  @HttpCode(HttpStatus.CREATED)
  async createPayment(@Body() createExternalTransferDto: CreateExternalTransferDto) {
    const externalTransfer = await this.externalTransferService.pay(createExternalTransferDto);
    return plainToInstance(ExternalTransferDto, externalTransfer);
  }
}
