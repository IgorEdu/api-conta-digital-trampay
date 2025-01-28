import { Transform } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExternalTransferDto {
  @IsString()
  @IsNotEmpty()
  accountIdOrUserId: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  externalBank: string = "000";

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  externalAgency: string = "000000";

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  externalAccount: string = "000000000";

  @IsDecimal(
    { decimal_digits: '1,2' },
    {
      message:
        'O valor deve ser um valor monetário válido com até 2 casas decimais.',
    },
  )
  @IsNotEmpty()
  amount: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
