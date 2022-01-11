import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_remunerations')
export class RemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public historialId: number;

  @Column()
  public typeRemunerationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean')
  public isBase: boolean;

  @Column('boolean')
  public bonification: boolean;

  @Column('boolean')
  public isEdit: boolean;

  @Column('boolean')
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}