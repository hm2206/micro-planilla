import { BankEntity } from "src/modules/banks/domain/bank.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

  @Column()
  public bankId: number;

  @Column({ default: true })
  public numberOfAccount: string;

  @Column('date')
  public dateOfAdmission: Date;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => ContractEntity, contract => contract.work)
  public contracts: ContractEntity[];

  @ManyToOne(() => BankEntity, bank => bank.works)
  public bank: BankEntity;
}