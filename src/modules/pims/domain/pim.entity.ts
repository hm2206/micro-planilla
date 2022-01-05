import { CargoEntity } from "src/modules/cargos/domain/cargo.entity";
import { MetaEntity } from "src/modules/metas/domain/meta.entity";
import { PimLogEntity } from "src/modules/pim-logs/domain/pim-log.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('pims')
@Unique('unique-pims', ['code', 'metaId', 'cargoId', 'year'])
export class PimEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public metaId: number;

  @Column()
  public cargoId: number;

  @Column()
  public year: number;

  @Column('decimal', { default: 0, precision: 12, scale: 2 })
  public money: number;

  @Column('boolean', { default: true })
  public state = true;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => CargoEntity, cargo => cargo.pims)
  public cargo: CargoEntity;

  @ManyToOne(() => MetaEntity, meta => meta.pims)
  public meta: MetaEntity;

  @OneToMany(() => PimLogEntity, pimLog => pimLog.pim)
  public pimLogs: PimLogEntity[];
}