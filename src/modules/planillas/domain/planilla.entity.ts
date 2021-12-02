import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('planillas')
export class PlanillaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'nombre' })
  public name: string;

  @Column({ name: 'descripcion' })
  public description: string;

  @Column({ name: 'plame_type' })
  public plameType: string;

  @Column({ name: 'plame_code' })
  public plameCode: string;

  @Column({ name: 'sello' })
  public sello: string;
  
  @Column({ default: true })
  public principal: boolean;

  @Column({ name: 'estado', default: true })
  public state: boolean;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: Date;
}