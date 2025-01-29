import { plainToInstance } from 'class-transformer';
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { TransferService } from './transfer.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferDto } from './dto/transfer.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MockAuthorizationService } from 'src/authorization/mock-authorization.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Transferência Interna')
@ApiBearerAuth()
@Controller('transfer')
export class TransferController {
  constructor(
    private transferService: TransferService,
    private readonly mockAuthorizationService: MockAuthorizationService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() dto: CreateTransferDto,
    @Headers('Authorization') jwtToken: string,
  ): Promise<TransferDto> {
    const isAuthorized =
      await this.mockAuthorizationService.validateJwt(jwtToken);

    if (!jwtToken || !jwtToken.startsWith('Bearer ')) {
      throw new UnauthorizedException('JWT token is missing or malformed');
    }

    if (!isAuthorized) {
      throw new UnauthorizedException('Authorization failed');
    }
    const account = await this.transferService.transfer(dto, jwtToken);
    return plainToInstance(TransferDto, account);
  }


  
}
