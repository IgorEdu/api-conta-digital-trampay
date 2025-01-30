import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateExternalTransferDto } from './dto/create-external-transfer.dto';
import { UpdateExternalTransferDto } from './dto/update-external-transfer.dto';
import { AuthorizationService } from '../../authorization/authorization.service';
import { AccountService } from '../account/account.service';
import { ExternalTransferRepository } from './external-transfer.repository';

@Injectable()
export class ExternalTransferService {
  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly externalTransferRepository: ExternalTransferRepository,
    private readonly accountService: AccountService,
  ) {}

  async deposit(createExternalTransferDto: CreateExternalTransferDto) {
    const accountReciever = await this.accountService.getAccount(
      createExternalTransferDto.accountIdOrUserId,
    );
    if (!accountReciever) {
      throw new BadRequestException('Conta interna não encontrada');
    }

    // const authorized = await this.authorizationService.authorize(dto);
    // if (!authorized) {
    //   throw new ForbiddenException('Transferência não autorizadas');
    // }

    if (
      !this.externalTransferRepository.executeDeposit(createExternalTransferDto)
    ) {
      throw new BadRequestException('Erro ao registrar transferência');
    }
  }

  async pay(createExternalTransferDto: CreateExternalTransferDto) {
    const accountSender = await this.accountService.getAccount(
      createExternalTransferDto.accountIdOrUserId,
    );
    if (!accountSender) {
      throw new BadRequestException('Conta interna não encontrada');
    }

    if (accountSender.balance < Number(createExternalTransferDto.amount)) {
      throw new BadRequestException('Saldo insuficiente');
    }

    // const authorized = await this.authorizationService.authorize(createExternalTransferDto);
    // if (!authorized) {
    //   throw new ForbiddenException('Transferência não autorizada');
    // }

    if (!this.externalTransferRepository.executePayment(createExternalTransferDto)) {
      throw new BadRequestException('Erro ao registrar transferência');
    }
  }
}
