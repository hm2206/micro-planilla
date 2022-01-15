import { HistorialEntity } from "../../../modules/historial/domain/historial.entity";
import { TypeRemunerationEntity } from "../../../modules/type-remunerations/domain/type-remuneration.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_remunerations')
export class RemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public historialId: number;

  @Column()
  public typeRemunerationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean')
  public isBase: boolean;

  @Column('boolean')
  public isBonification: boolean;

  @Column('boolean')
  public isEdit: boolean;

  @Column('boolean')
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => HistorialEntity,
    history => history.remunerations, {
    onDelete: 'CASCADE'
  })
  public historial: HistorialEntity;

  @ManyToOne(() => TypeRemunerationEntity,
    typeRemuneration => typeRemuneration.remunerations)
  public typeRemuneration: TypeRemunerationEntity;
}