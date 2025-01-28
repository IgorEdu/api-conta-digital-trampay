import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { TransferRepository } from './transfer.repository';
import { AuthorizationService } from '../../shared/authorization/authorization.service';
import { AccountService } from '../account/account.service';

@Injectable()
export class TransferService {
  // private readonly logger = new Logger(TransfersService.name);

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly transferRepository: TransferRepository,
    private readonly accountService: AccountService,
  ) {}

  async transfer(dto: CreateTransferDto): Promise<void> {
    const accountSender = await this.accountService.getAccount(dto.accountSender);
    if (!accountSender) {
      throw new BadRequestException('Conta de envio não encontrada');
    }
    
    if (accountSender.balance < Number(dto.amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    const authorized = await this.authorizationService.authorize(dto);
    if (!authorized) {
      throw new ForbiddenException('Transferência não autorizadas');
    }

    if (!this.transferRepository.executeTransfer(dto)) {
      throw new BadRequestException('Erro ao registrar transferência');
    }
  }
}