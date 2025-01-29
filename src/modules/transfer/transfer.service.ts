import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferRepository } from './transfer.repository';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransferService {
  // private readonly logger = new Logger(TransfersService.name);

  constructor(
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) {}

  async transfer(dto: CreateTransferDto, jwtToken: string): Promise<void> {
    // const authorized = await this.authorizationService.validateJwt(jwtToken);

    // if (!jwtToken || !jwtToken.startsWith('Bearer ')) {
    //   throw new UnauthorizedException('JWT token is missing or malformed');
    // }

    // if (!authorized) {
    //   throw new UnauthorizedException('Token não permitido. Transferência não autorizadas');
    // }

    const accountSender = await this.accountService.getAccount(dto.accountSender);
    if (!accountSender) {
      throw new BadRequestException('Conta de envio não encontrada');
    }
    
    if (accountSender.balance < Number(dto.amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    if (!this.transferRepository.executeTransfer(dto)) {
      throw new BadRequestException('Erro ao registrar transferência');
    }
  }
}