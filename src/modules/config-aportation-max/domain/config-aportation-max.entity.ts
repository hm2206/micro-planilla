import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity('p_config_aportation_max')
export class ConfigAportationMaxEntity {
  @PrimaryColumn()
  public id: number;

  @Column()
  public typeCategoryId: number;

  @Column()
  public typeAportationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public uit: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number; 

  @Column()
  public year: number;

  @Column('boolean')
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}