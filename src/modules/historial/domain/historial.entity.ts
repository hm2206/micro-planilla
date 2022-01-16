import { Column, CreateDateColumn, Unique, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CronogramaEntity } from '../../../modules/cronogramas/domain/cronograma.entity';
import { InfoEntity } from '../../../modules/infos/domain/info.entity';
import { PimEntity } from '../../../modules/pims/domain/pim.entity';
import { AfpEntity } from '../../../modules/afps/domain/afp.entity';
import { BankEntity } from '../../../modules/banks/domain/bank.entity';
import { RemunerationEntity } from '../../../modules/remunerations/domain/remuneration.entity';
import { DiscountEntity } from '../../../modules/discounts/domain/discount.entity';
import { AportationEntity } from '../../../modules/aportations/domain/aportation.entity';

@Entity('p_historials')
@Unique('u_historials', ['cronogramaId', 'infoId'])
export class HistorialEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public cronogramaId: number;
  
  @Column()
  public infoId: number;

  @Column()
  public pimId: number;

  @Column()
  public afpId: number;

  @Column('date', { nullable: true })
  public affiliationOfDate: Date;

  @Column({ nullable: true })
  public numberOfCussp: string;

  @Column('boolean', { default: true })
  public isPrimaSeguro = true;

  @Column({ nullable: true })
  public numberOfEssalud: string;

  @Column()
  public bankId: number;

  @Column({ nullable: true })
  public numberOfAccount: string;

  @Column('boolean')
  public isCheck: boolean;

  @Column({ nullable: true })
  public plaza: string;

  @Column('boolean', { default: false })
  public sendEmail: boolean;

  @Column({ nullable: true })
  public tokenVerify : string;

  @Column('boolean')
  public isPay: boolean;

  @Column()
  public days: number;

  @Column('text', { nullable: true })
  public observation: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => CronogramaEntity,
    cronograma => cronograma.historials, {
    onDelete: 'CASCADE'
  })
  public cronograma: CronogramaEntity

  @ManyToOne(() => InfoEntity,
    info => info.historials)
  public info: InfoEntity;

  @ManyToOne(() => PimEntity,
    pim => pim.historials)
  public pim: PimEntity;

  @ManyToOne(() => AfpEntity,
    afp => afp.historials)
  public afp: AfpEntity;

  @ManyToOne(() => BankEntity,
    bank => bank.historials)
  public bank: BankEntity;

  @OneToMany(() => RemunerationEntity,
    remuneration => remuneration.historial, {
      cascade: true
  })
  public remunerations: RemunerationEntity[];

  @OneToMany(() => DiscountEntity,
    discount => discount.historial, {
      cascade: true
  })
  public discounts: DiscountEntity[];

  @OneToMany(() => AportationEntity,
    aportation => aportation.historial, {
    cascade: true
  })
  public aportations: AportationEntity[];
}