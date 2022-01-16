import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DiscountEntity } from "../../../modules/discounts/domain/discount.entity";

@Entity('p_afiliations')
export class AffiliationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public discountId: number;

  @Column()
  public infoTypeAffiliationId: number;

  @Column('boolean')
  public isPercent: boolean;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => DiscountEntity,
    discount => discount.affiliations, {
      onDelete: 'CASCADE'    
  }) 
  public discount: DiscountEntity;
}