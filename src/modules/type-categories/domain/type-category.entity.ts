import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypeCargoEntity } from "../../../modules/type-cargos/domain/type-cargo.entity";
import { ContractEntity } from "../../../modules/contracts/domain/contract.entity";

@Entity('p_type_categories')
export class TypeCategoryEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public dedication: string;

  @Column()
  public typeCargoId: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => TypeCargoEntity, typeCargo => typeCargo.typeCategories)
  public typeCargo: TypeCargoEntity;

  @OneToMany(() => ContractEntity, contract => contract.typeCategory)
  public contracts: ContractEntity[];
}