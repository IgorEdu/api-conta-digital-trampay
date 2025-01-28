import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AccountDto {
  @Expose()
  id: number;

  @Expose()
  userId: string;

  @Expose()
  balance: number;
  // @Expose()
  // fullName: string;

  // @Expose()
  // cpfCnpj: string;
}