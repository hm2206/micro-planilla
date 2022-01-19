import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeObligationMode } from "../../../modules/type-oblications/domain/type-obligation.enum";
import { TypeObligationEntity } from "../../../modules/type-oblications/domain/type-obligation.entity";
import { DiscountEntity } from "../../../modules/discounts/domain/discount.entity";

@Entity('p_obligations')
export class ObligationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public typeObligationId: number;

  @Column()
  public discountId: number;

  @Column()
  public documentTypeId: string;

  @Column()
  public documentNumber: string;

  @Column()
  public bankId: number;

  @Column({ nullable: true })
  public numberOfAccount: string;

  @Column('boolean')
  public isCheck: boolean;

  @Column('boolean', { default: true })
  public isPercent: boolean;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('text')
  public observation: string;

  @Column('enum', {
    enum: TypeObligationMode,
    default: TypeObligationMode.DEFAULT
  })
  public mode: TypeObligationMode

  @Column('boolean', { default: false })
  public isBonification: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => TypeObligationEntity,
    typeObligation => typeObligation.obligations)
  public typeObligation: TypeObligationEntity;

  @ManyToOne(() => DiscountEntity,
    discount => discount.obligations, {
      onDelete: 'CASCADE'    
  })
  public discount: DiscountEntity;
}