import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AfpEntity } from "../../../modules/afps/domain/afp.entity";
import { ContractEntity } from "../../../modules/contracts/domain/contract.entity";

@Entity('p_works')
export class WorkEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ unique: true })
  public personId: number;

  @Column()
  public afpId: number;

  @Column('date', { nullable: true })
  public affiliationOfDate: Date;

  @Column({ nullable: true })
  public numberOfCussp: string;

  @Column('boolean', { default: true })
  public isPrimaSeguro = true;

  @Column({ nullable: true })
  public numberOfEssalud: string;

  @Column('date')
  public dateOfAdmission: Date;

  @Column({ nullable: true })
  public orderBy: string;

  @Column('boolean', { default: false })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => AfpEntity, afp => afp.works)
  public afp: AfpEntity;

  @OneToMany(() => ContractEntity, contract => contract.work)
  public contracts: ContractEntity[];

  public person: any;
}