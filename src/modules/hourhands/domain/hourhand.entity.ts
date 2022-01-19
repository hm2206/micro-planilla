import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ContractEntity } from "../../../modules/contracts/domain/contract.entity";

@Entity('p_hourhands')
export class HourhandEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => ContractEntity, contract => contract.hourhand)
  public contracts: ContractEntity[];
}