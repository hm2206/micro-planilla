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

  @Column({ default: 0 })
  public adicional: number;

  @Column({ default: 30 })
  public dias: number;

  @Column()
  public observacion: string;

  @Column()
  public token: string;

  @Column()
  public entityId: number;

  @Column()
  public planillaId: number;

  @Column()
  public sedeId: number;

  @Column({ default: false })
  public remanente: boolean;

  @Column('boolean', { default: false })
  public sendEmail: boolean

  @Column('boolean', { default: false})
  public processing: boolean;

  @Column({ default: '/img/sello.png' })
  public sello: string

  @Column({ default: 0 })
  public countToken: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date; 
}