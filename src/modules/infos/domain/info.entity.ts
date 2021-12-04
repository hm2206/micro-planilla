import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('infos')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'cargo_id' })
  public cargoId: number;

  @Column({ name: 'type_categoria_id' })
  public typeCategoriaId: number;

  @Column({ name: 'meta_id' })
  public metaId: number;
}