import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_sindicatos')
export class SindicatoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public discountId: number;

  @Column()
  public typeSindicatoId: number;

  @Column('boolean')
  public isPercent: boolean;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}