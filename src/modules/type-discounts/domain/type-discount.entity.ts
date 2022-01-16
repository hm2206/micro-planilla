import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InfoTypeDiscountEntity } from "../../../modules/info-type-discounts/domain/info-type-discount.entity";
import { DiscountEntity } from "../../../modules/discounts/domain/discount.entity";
import { TypeObligationEntity } from "../../../modules/type-oblications/domain/type-obligation.entity";

@Entity('p_type_discounts')
export class TypeDiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public description: string;

  @Column('boolean', { default: true })
  public isEdit: boolean;

  @Column('boolean', { default: true })
  public plame: boolean;

  @Column('boolean', { default: false })
  public judicial: boolean;

  @Column('boolean', { default: false })
  public except: boolean;

  @Column('boolean', { default: false })
  public renta: boolean;

  @Column('boolean', { default: false })
  public isEscalafon: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoTypeDiscountEntity,
    info => info.typeDiscount)
  public infos: InfoTypeDiscountEntity[];

  @OneToMany(() => DiscountEntity,
    discount => discount.typeDiscount)
  public discounts: DiscountEntity[];

  @OneToMany(() => TypeObligationEntity,
    typeObligation => typeObligation.typeDiscount)
  public typeObligations: TypeObligationEntity[];
}