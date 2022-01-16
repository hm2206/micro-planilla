import { HistorialEntity } from "src/modules/historial/domain/historial.entity";
import { AffiliationEntity } from "src/modules/affiliations/domain/affiliation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeDiscountEntity } from "../../../modules/type-discounts/domain/type-discount.entity";

@Entity('p_discounts')
export class DiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public historialId: number;

  @Column()
  public typeDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean')
  public isEdit: boolean;

  @Column('boolean')
  public isModify: boolean;

  @Column('boolean', { default: false })
  public isSync: boolean;

  @Column('boolean')
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => TypeDiscountEntity,
    typeDiscount => typeDiscount.discounts)
  public typeDiscount: TypeDiscountEntity;

  @OneToMany(() => AffiliationEntity,
    affiliation => affiliation.discount, {
      cascade: true
  })
  public affiliations: AffiliationEntity[];

  @ManyToOne(() => HistorialEntity,
    historial => historial.discounts, {
      onDelete: 'CASCADE'
  })
  public historial: HistorialEntity;
}