import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pim_logs')
export class PimLogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public pimId: number;

  @Column('decimal', { default: 0, precision: 12, scale: 2 })
  public money: number;

  @Column()
  public date: Date;

  @Column('boolean', { default: true })
  public isDefault: boolean

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}