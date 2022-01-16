import { TypeObligationMode } from "../../../modules/type-oblications/domain/type-obligation.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_obligations')
export class ObligationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public documentTypeId: number;

  @Column()
  public documentNumber: string;

  @Column()
  public bankId: number;

  @Column()
  public numberOfAccount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column({ default: true })
  public observation: string;

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