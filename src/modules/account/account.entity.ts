import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('account')
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', unique: true})
  userId: string;

  // @Column({ name: 'full_name' })
  // fullName: string;

  // @Column({ name: 'cpf_cnpj', unique: true })
  // cpfCnpj: string;

  @Column({ name: 'balance', type: 'decimal', precision: 10, scale: 2, nullable: false })
  balance: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}