import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_info_type_affiliations')
export class InfoTypeAffiliationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public infoId: number;

  @Column()
  public typeAffiliationId: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public amount: number;

  @Column('date', { nullable: true })
  public terminationDate: Date;

  @Column('boolean', { default: false })
  public isOver: boolean;

  @Column('boolean', { default: true })
  public isSync: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn() 
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}