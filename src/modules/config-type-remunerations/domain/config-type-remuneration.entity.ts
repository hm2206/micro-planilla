import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('p_config_type_remunerations')
@Unique('u_config_type_remunerations', ['planillaId', 'typeCategoryId', 'typeRemunerationId'])
export class ConfigTypeRemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public planillaId: number;

  @Column()
  public typeCategoryId: number;

  @Column()
  public typeRemunerationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}