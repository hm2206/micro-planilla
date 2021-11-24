import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cronogramas')
export class CronogramaEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}