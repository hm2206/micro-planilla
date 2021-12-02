import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('cronogramas')
export class CronogramaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public descripcion: string;

  @Column()
  public year: number;

  @Column()
  public mes: number;

  @Column({ default: false })
  public adicional: boolean;

  @Column({ default: 30 })
  public dias: number;

  @Column()
  public observacion: string;

  @Column()
  public token: string;

  @Column({ name: 'entity_id' })
  public entityId: number;

  @Column({ name: 'planilla_id' })
  public planillaId: number;

  @Column({ name: 'sede_id' })
  public sedeId: number;

  @Column({ default: false })
  public remanente: boolean;

  @Column({ name: 'send_email', default: false })
  public sendEmail: boolean

  @Column({ default: false})
  public processing: boolean;

  @Column({ default: '/img/sello.png' })
  public sello: string

  @Column({ name: 'count_token', default: 0 })
  public countToken: number;

  @Column({ name: 'estado', default: true })
  public state: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date; 
}