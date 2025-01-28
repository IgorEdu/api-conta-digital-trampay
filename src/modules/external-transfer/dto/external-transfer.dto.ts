import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ExternalTransferDto {
  @Expose()
  id: number;

  @Expose()
  accountId: string;

  @Expose()
  externalBank: string;

  @Expose()
  externalAgency: string;

  @Expose()
  externalAccount: string;

  @Expose()
  amount: string;

  @Expose()
  date: Date;
}