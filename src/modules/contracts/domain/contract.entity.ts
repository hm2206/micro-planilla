import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { ContractConditionEnum } from "./contract.enum";
import { WorkEntity } from "../../../modules/works/domain/work.entity";
import { DependencyEntity } from "../../../modules/dependencies/domain/dependency.entity";
import { ProfileEntity } from "../../../modules/profiles/domain/profile.entity";
import { TypeCargoEntity } from "../../../modules/type-cargos/domain/type-cargo.entity";
import { InfoEntity } from "../../../modules/infos/domain/info.entity";

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
  public typeCargoId: number;

  @Column()
  public typeCategoriaId: number;

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

  @ManyToOne(() => WorkEntity, work => work.contracts)
  public work: WorkEntity;

  @ManyToOne(() => DependencyEntity, dependency => dependency.contracts)
  public dependency: DependencyEntity;

  @ManyToOne(() => ProfileEntity, profile => profile.contracts)
  public profile: ProfileEntity;

  @ManyToOne(() => TypeCargoEntity, typeCargo => typeCargo.contracts)
  public typeCargo: TypeCargoEntity;

  @ManyToOne(() => InfoEntity, info => info.contract)
  public infos: InfoEntity[];
}