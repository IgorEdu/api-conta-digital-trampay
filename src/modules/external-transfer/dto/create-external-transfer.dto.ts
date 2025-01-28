import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateExternalTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID da conta do remetente da transferência, ou ID do usuário gerenciado pelo sistema externo de autenticação',
    example: '2c1d1eee-f7dc-4300-baf3-152f3022b367',
  })
  accountIdOrUserId: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  @ApiProperty({
    description: 'Banco externo',
    example: '104',
    default: '000',
    required: false,
  })
  externalBank: string = "000";

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  @ApiProperty({
    description: 'Agência externa',
    example: '337281',
    default: '000000',
    required: false,
  })
  externalAgency: string = "000000";

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  @ApiProperty({
    description: 'Conta externa',
    example: '337281',
    default: '000000000',
    required: false,
  })
  externalAccount: string = "000000000";

  @IsDecimal(
    { decimal_digits: '1,2' },
    {
      message:
        'O valor deve ser um valor monetário válido com até 2 casas decimais.',
    },
  )
  @IsNotEmpty()
  @ApiProperty({
    description: 'Valor da transferência',
    example: '100.00',
  })
  amount: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Senha da conta do remetente',
    example: '123456',
  })
  password: string;
}
