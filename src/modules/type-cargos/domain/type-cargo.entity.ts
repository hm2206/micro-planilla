import { TypeCategoryEntity } from "../../../modules/type-categories/domain/type-category.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_type_cargos')
export class TypeCargoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column()
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => TypeCategoryEntity, typeCategory => typeCategory.typeCargo)
  public typeCategories: TypeCategoryEntity[];
} 