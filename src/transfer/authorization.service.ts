import axios, { AxiosResponse } from 'axios';
import { Injectable, Logger } from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CreateExternalTransferDto } from 'src/external-transfer/dto/create-external-transfer.dto';

interface AuthorizationResponse {
  status: string;
  data: {
    authorization: boolean;
  };
}

@Injectable()
export class AuthorizationService {
  private readonly logger = new Logger(AuthorizationService.name);

  async authorize(dto: CreateTransferDto | CreateExternalTransferDto): Promise<boolean> {
    const url = 'https://util.devi.tools/api/v2/authorize';

    try {
      const response: AxiosResponse<AuthorizationResponse> =
        await axios.get(url);
      return (
        response.data.status === 'success' && response.data.data.authorization
      );
    } catch (error) {
      this.logger.error('Authorization request failed', error.message);
      return false;
    }
  }
}