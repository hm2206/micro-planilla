import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('p_cronogramas')
export class CronogramaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public year: number;

  @Column()
  public month: number;

  @Column({ default: 0 })
  public adicional: number;

  @Column({ default: 30 })
  public days: number;

  @Column()
  public observation: string;

  @Column()
  public token: string;

  @Column()
  public campusId: number;

  @Column()
  public planillaId: number;

  @Column({ default: false })
  public remanente: boolean;

  @Column('boolean', { default: false })
  public sendEmail: boolean

  @Column('boolean', { default: false })
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