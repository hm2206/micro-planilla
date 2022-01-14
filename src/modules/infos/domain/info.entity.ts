import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { ContractEntity } from '../../../modules/contracts/domain/contract.entity';
import { PlanillaEntity } from '../../../modules/planillas/domain/planilla.entity';
import { PimEntity } from '../../../modules/pims/domain/pim.entity';
import { BankEntity } from '../../../modules/banks/domain/bank.entity';
import { InfoTypeRemunerationEntity } from '../../../modules/info-type-remunerations/domain/info-type-remuneration.entity';
import { InfoTypeDiscountEntity } from '../../../modules/info-type-discounts/domain/info-type-discount.entity';
import { InfoTypeAportationEntity } from '../../../modules/info-type-aportations/domain/info-type-aportation.entity';
import { HistorialEntity } from '../../../modules/historial/domain/historial.entity';

@Entity('p_infos')
@Unique('p_infos', ['contractId', 'planillaId'])
export class InfoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public contractId: number;

  @Column()
  public planillaId: number;

  @Column()
  public pimId: number;

  @Column()
  public bankId: number;

  @Column({ nullable: true })
  public numberOfAccount: string;

  @Column('boolean', { default: true })
  public isCheck: boolean;

  @Column('boolean', { default: true })
  public isPay: boolean;
    
  @Column('boolean', { default: true })
  public isEmail: boolean;

  @Column('boolean', { default: true })
  public isSync: boolean;

  @Column('text', { nullable: true })
  public observation: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => ContractEntity, contract => contract.infos)
  public contract: ContractEntity;

  @ManyToOne(() => PlanillaEntity, planilla => planilla.infos)
  public planilla: PlanillaEntity;

  @ManyToOne(() => PimEntity, pim => pim.infos)
  public pim: PimEntity;

  @ManyToOne(() => BankEntity, bank => bank.infos)
  public bank: BankEntity;

  @OneToMany(() => InfoTypeRemunerationEntity, typeRemuneration => typeRemuneration.info)
  public typeRemunerations: InfoTypeRemunerationEntity[];

  @OneToMany(() => InfoTypeDiscountEntity, typeDiscount => typeDiscount.info)
  public typeDiscounts: InfoTypeDiscountEntity[];

  @OneToMany(() => InfoTypeAportationEntity, typeAportation => typeAportation.info)
  public typeAportations: InfoTypeAportationEntity[];

  @OneToMany(() => HistorialEntity, history => history.info)
  public historials: HistorialEntity[];
}