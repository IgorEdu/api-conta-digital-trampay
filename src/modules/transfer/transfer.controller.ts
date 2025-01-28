import { plainToInstance } from 'class-transformer';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Transferência Interna')
@Controller('transfer')
export class TransferController {
  constructor(private transferService: TransferService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() dto: CreateTransferDto): Promise<TransferDto> {
    const account = await this.transferService.transfer(dto);
    return plainToInstance(TransferDto, account);
  }
}