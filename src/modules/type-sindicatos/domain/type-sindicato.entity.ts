import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_type_sindicatos')
export class TypeSindicatoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column()
  public typeDiscountId: number;

  @Column('boolean', { default: false })
  public isPercent: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}