import { Transform } from 'class-transformer';
import { IsEmail, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => (value == null ? 0 : value)) 
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