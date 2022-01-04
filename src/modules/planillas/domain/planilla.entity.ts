import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('planillas')
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
}