import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HistorialEntity } from "../../../modules/historial/domain/historial.entity";
import { TypeAportationEntity } from "../../../modules/type-aportations/domain/type-aportation.entity";

@Entity('p_aportations')
export class AportationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public historialId: number;

  @Column()
  public typeAportationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public min: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public default: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => HistorialEntity,
    historial => historial.aportations, {
      onDelete: 'CASCADE'
  })
  public historial: HistorialEntity;

  @ManyToOne(() => TypeAportationEntity,
    typeAportation => typeAportation.aportations)
  public typeAportation: TypeAportationEntity;
}