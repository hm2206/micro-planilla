import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('p_config_type_aportations')
@Unique('u-config-type-aportations', ['planillaId', 'typeCategoryId', 'typeAportationId'])
export class ConfigTypeAportationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public planillaId: number;

  @Column()
  public typeCategoryId: number;

  @Column()
  public typeAportationId: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}