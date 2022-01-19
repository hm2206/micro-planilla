import { PimEntity } from "../../../modules/pims/domain/pim.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PimLogModeEnum } from "./pim-log.enum";

@Entity('p_pim_logs')
export class PimLogEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public pimId: number;

  @Column('decimal', { default: 0, precision: 12, scale: 2 })
  public amount: number;

  @Column('date')
  public date: Date;

  @Column('boolean', { default: true })
  public isDefault: boolean

  @Column('enum', {
    enum: PimLogModeEnum,
    default: PimLogModeEnum.ENTRY
  })
  public mode: PimLogModeEnum;

  @Column('text', { nullable: true })
  public observation: string;

  @Column({ default: 0 })
  public fileId: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => PimEntity, pim => pim.pimLogs, {
    onDelete: 'CASCADE'
  })
  public pim: PimEntity;
}