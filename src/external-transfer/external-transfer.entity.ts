import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('external_transfer')
export class ExternalTransfer {
    @PrimaryGeneratedColumn('uuid')
      id?: string;
    
      @Column({ name: 'account_id' })
      accountId: string;

      @Column({ name: 'external_bank' })
      externalBank: string;
    
      @Column({ name: 'external_agency' })
      externalAgency: string;

      @Column({ name: 'external_account' })
      externalAccount: string;
    
      @Column({ type: 'decimal', precision: 10, scale: 2 })
      amount: number;
    
      @Column({ name: 'status'})
      status: string;
    
      @Column({ name: 'type'})
      type: string;
    
      @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
      created_at?: Date;

      @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
      updated_at?: Date;
}
