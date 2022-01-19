import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('p_config_type_discounts')
@Unique('u_config_type_discounts', ['planillaId', 'typeCategoryId', 'typeDiscountId'])
export class ConfigTypeDiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public planillaId: number;

  @Column()
  public typeCategoryId: number;

  @Column()
  public typeDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}