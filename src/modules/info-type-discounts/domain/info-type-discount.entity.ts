import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeDiscountEntity } from "../../../modules/type-discounts/domain/type-discount.entity";

@Entity('p_info_type_discounts')
export class InfoTypeDiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public infoId: number;

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

  @ManyToOne(() => InfoEntity, info => info.typeDiscounts)
  public info: InfoEntity;

  @ManyToOne(() => TypeDiscountEntity, typeDiscount => typeDiscount.infos)
  public typeDiscount: TypeDiscountEntity;
}