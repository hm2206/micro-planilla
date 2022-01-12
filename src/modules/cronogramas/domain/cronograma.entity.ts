import { PlanillaEntity } from '../../../modules/planillas/domain/planilla.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from 'typeorm';
import { HistorialEntity } from '../../../modules/historial/domain/historial.entity';

@Entity('p_cronogramas')
@Unique('u_cronogramas', ['year', 'month', 'campusId', 'planillaId', 'adicional'])
export class CronogramaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public year: number;

  @Column()
  public month: number;

  @Column({ default: 30 })
  public numberOfDays: number;

  @Column({ default: 0 })
  public adicional: number;

  @Column({ nullable: true })
  public observation: string;

  @Column()
  public token: string;

  @Column()
  public campusId: number;

  @Column()
  public planillaId: number;

  @Column({ default: 0 })
  public selloId: number;

  @Column({ default: false })
  public remanente: boolean;

  @Column('boolean', { default: false })
  public sendEmail: boolean

  @Column('boolean', { default: false })
  public processing: boolean;

  @Column({ default: 0 })
  public countToken: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date; 

  @ManyToOne(() => PlanillaEntity, planilla => planilla.cronogramas)
  public planilla: PlanillaEntity;

  @OneToMany(() => HistorialEntity, historial => historial.cronograma, {
    cascade: true
  })
  public historials: HistorialEntity[];

  public historialsCount!: number;
}