import { ApiProperty } from '@nestjs/swagger';
import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID da conta do remetente da transferência',
    example: '2c1d1eee-f7dc-4300-baf3-152f3022b367',
  })
  accountSender: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'ID da conta do destinatário da transferência',
    example: '8d1bea2a-64c5-4bf9-a7a8-c28b466304d2',
  })
  accountReceiver: string;

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
