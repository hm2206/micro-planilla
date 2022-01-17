import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AfpEntity } from "../../../modules/afps/domain/afp.entity";
import { CronogramaEntity } from "../../../modules/cronogramas/domain/cronograma.entity";

@Entity('p_config_afps') 
export class ConfigAfpEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public afpId: number;

  @Column()
  public cronogramaId: number;

  @Column()
  public typeDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column()
  public aportDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public aportPercent: number;

  @Column()
  public primaDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public primaPercent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public primaLimit: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date; 

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => AfpEntity,
    afp => afp.configAfps)
  public afp: AfpEntity;

  @ManyToOne(() => CronogramaEntity,
    cronograma => cronograma.configAfps, {
      onDelete: 'CASCADE'
  })
  public cronograma: CronogramaEntity;
}