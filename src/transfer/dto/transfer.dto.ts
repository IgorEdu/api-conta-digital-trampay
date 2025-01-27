import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class TransferDto {
  @Expose()
  id: number;

  @Expose()
  accountSender: string;

  @Expose()
  accountReceiver: string;

  @Expose()
  amount: number;

  @Expose()
  date: Date;
}