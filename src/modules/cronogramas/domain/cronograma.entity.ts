import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cronogramas')
export class CronogramaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public year: number;

  @Column()
  public mes: number;
}