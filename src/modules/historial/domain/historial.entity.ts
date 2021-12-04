import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('historials')
export class HistorialEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'work_id' })
  public workId: number;

  @Column({ name: 'info_id' })
  public infoId: number;

  @Column({ name: 'cargo_id' })
  public cargoId: number;

  @Column({ name: 'type_categoria_id' })
  public typeCategoriaId: number;

  @Column({ name: 'meta_id' })
  public metaId: number;

  @Column({ name: 'cronograma_id' })
  public cronogramaId: number;

  @Column({ name: 'is_email' })
  public isEmail: boolean;

  @Column({ name: 'send_email' })
  public sendEmail: boolean;

  @Column({ name: 'token_verify' })
  public tokenVerify: string;
}