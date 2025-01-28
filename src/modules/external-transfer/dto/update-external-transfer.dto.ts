import { PartialType } from '@nestjs/mapped-types';
import { CreateExternalTransferDto } from './create-external-transfer.dto';

export class UpdateExternalTransferDto extends PartialType(CreateExternalTransferDto) {}
