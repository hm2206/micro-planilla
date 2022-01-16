import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeObligationMode } from "./type-obligation.enum";
import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { TypeDiscountEntity } from "../../../modules/type-discounts/domain/type-discount.entity";

@Entity('p_type_obligations')
export class TypeObligationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public personId: number;

  @Column()
  public infoId: number;

  @Column()
  public typeDiscountId: number;

  @Column()
  public documentTypeId: number;

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
  
  @Column('date', { nullable: true })
  public terminationDate: Date;

  @Column('boolean', { default: true })
  public isOver: boolean;

  @Column('boolean', { default: false })
  public isBonification: boolean;

  @Column()
  public orderBy: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => InfoEntity,
    info => info.typeObligations)
  public info: InfoEntity;

  @ManyToOne(() => TypeDiscountEntity,
    typeDiscount => typeDiscount.typeObligations)
  public typeDiscount: TypeDiscountEntity;
}