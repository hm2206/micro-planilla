import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ContractConditionEnum } from "./contract.enum";
import { WorkEntity } from "../../../modules/works/domain/work.entity";
import { DependencyEntity } from "../../../modules/dependencies/domain/dependency.entity";
import { ProfileEntity } from "../../../modules/profiles/domain/profile.entity";
import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { TypeCategoryEntity } from "../../../modules/type-categories/domain/type-category.entity";

@Entity('p_contracts')
@Unique('contracts', ['workId', 'resolution'])
export class ContractEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public workId: number;

  @Column()
  public dependencyId: number;

  @Column()
  public profileId: number;

  @Column()
  public typeCategoryId: number;

  @Column('enum', { enum: ContractConditionEnum })
  public condition: ContractConditionEnum

  @Column({ nullable: true })
  public plaza: string;

  @Column({ nullable: true })
  public codeAIRHSP: string;

  @Column()
  public codeAssistance: string;

  @Column()
  public hourhandId: number;

  @Column()
  public resolution: string;

  @Column('date')
  public dateOfResolution: Date;

  @Column('date')
  public dateOfAdmission: Date;

  @Column('date', { nullable: true })
  public terminationDate: Date;

  @Column('text', { nullable: true })
  public observation: string;

  @Column({ default: 8 })
  public hours: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoEntity, info => info.contract)
  public infos: InfoEntity[];

  @ManyToOne(() => WorkEntity, work => work.contracts)
  public work: WorkEntity;

  @ManyToOne(() => DependencyEntity, dependency => dependency.contracts)
  public dependency: DependencyEntity;

  @ManyToOne(() => ProfileEntity, profile => profile.contracts)
  public profile: ProfileEntity;

  @ManyToOne(() => TypeCategoryEntity, typeCategory => typeCategory.contracts)
  public typeCategory: TypeCategoryEntity;
}