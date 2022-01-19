import { InfoTypeAffiliationEntity } from "../../../modules/info-type-affiliations/domain/info-type-affiliation.entity";
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

@Entity('p_type_affiliations')
export class TypeAffiliationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column()
  public typeDiscountId: number;

  @Column('boolean', { default: false })
  public isPercent: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoTypeAffiliationEntity,
    info => info.typeAffiliation)
  public infos: InfoTypeAffiliationEntity[];
}