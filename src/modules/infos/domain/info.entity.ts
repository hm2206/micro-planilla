import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { ContractEntity } from '../../../modules/contracts/domain/contract.entity';
import { PimEntity } from '../../../modules/pims/domain/pim.entity';

@Entity('p_infos')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public contractId: number;

  @Column()
  public planillaId: number;

  @Column()
  public pimId: number;

  @Column('boolean', { default: true })
  public isCheck = true;

  @Column('boolean', { default: true })
  public isPay: boolean;
    
  @Column('boolean', { default: true })
  public isEmail = true;

  @Column('boolean', { default: true })
  public isSync: boolean;

  @Column('boolean', { default: true })
  public state = true;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => ContractEntity, contract => contract.infos)
  public contract: ContractEntity;

  @ManyToOne(() => PimEntity, pim => pim.infos)
  public pim: PimEntity;
}