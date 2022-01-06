import { PimEntity } from "src/modules/pims/domain/pim.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_metas')
export class MetaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public sectorId: string;

  @Column()
  public sector: string;

  @Column()
  public pliegoId: string;

  @Column()
  public pliego: string;

  @Column()
  public unidadId: string;

  @Column()
  public unidad: string;

  @Column()
  public programaId: string;

  @Column()
  public programa: string;

  @Column()
  public functionId: string;
  
  @Column()
  public function: string;

  @Column()
  public subProgramaId: string;

  @Column()
  public subPrograma: string;

  @Column()
  public actividadId: string;

  @Column()
  public actividad: string;

  @Column('boolean', { default: true })
  public state = true;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => PimEntity, pim => pim.meta)
  public pims: PimEntity[];
}