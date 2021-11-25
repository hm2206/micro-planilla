import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type_remuneracions')
export class TypeRemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}