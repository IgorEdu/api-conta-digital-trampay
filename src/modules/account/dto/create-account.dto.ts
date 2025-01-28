import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID do usuário',
    example: '1c5685c1-17c2-40bb-8168-36885ca9de3e',
  })
  userId: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
  @ApiProperty({
    description: '(Opcional) Saldo inicial da conta',
    example: 0,
    default: 0,
    required: false,
  })
  balance: number = 0;

  // @IsString()
  // @IsNotEmpty()
  // fullName: string;

  // @IsString()
  // @IsNotEmpty()
  // @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
  //   message: 'cpfCnpj must be a valid CPF or CNPJ',
  // })
  // cpfCnpj: string;
}