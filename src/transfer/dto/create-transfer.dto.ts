import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferDto {
  @IsString()
  @IsNotEmpty()
  accountSender: string;

  @IsString()
  @IsNotEmpty()
  accountReceiver: string;

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
