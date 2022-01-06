import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeObligationMode } from "./type-obligation.enum";

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
  public documentTypeId: string;

  @Column()
  public documentNumber: string;

  @Column()
  public bankId: number;

  @Column()
  public numberOfAccount: string;

  @Column('decimal', { precision: 12, scale: 2 })
  public porcentaje: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public monto: number;

  @Column({ default: true })
  public observation: string;

  @Column('date')
  public startDate: Date;

  @Column('date', { nullable: true })
  public overDate: Date;

  @Column('boolean', { default: true })
  public isPorcentaje: boolean;

  @Column('enum', { enum: TypeObligationMode, default: TypeObligationMode.DEFAULT })
  public mode: TypeObligationMode

  @Column('boolean', { default: false })
  public bonification: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}