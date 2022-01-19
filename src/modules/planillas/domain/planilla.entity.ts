import { InfoEntity } from '../../../modules/infos/domain/info.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { CronogramaEntity } from '../../../modules/cronogramas/domain/cronograma.entity';

@Entity('p_planillas')
export class PlanillaEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public plameType: string;

  @Column({ nullable: true })
  public plameCode: string;

  @Column()
  public sello: string;
  
  @Column({ default: true })
  public principal: boolean;

  @Column({ default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoEntity, info => info.planilla)
  public infos: InfoEntity[];

  @OneToMany(() => CronogramaEntity, cronograma => cronograma.planilla)
  public cronogramas: CronogramaEntity[];
}