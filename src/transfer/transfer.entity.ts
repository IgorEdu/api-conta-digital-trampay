import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfer')
export class Transfer {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({ name: 'account_sender' })
  accountSender: string;

  @Column({ name: 'account_receiver' })
  accountReceiver: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  date?: Date;
}