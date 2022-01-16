import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { TypeAffiliationEntity } from "../../../modules/type-affiliations/domain/type-affiliation.entity";
import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { AffiliationEntity } from "../../../modules/affiliations/domain/affiliation.entity";

@Entity('p_info_type_affiliations')
@Unique('u_info_type_affiliations', ['infoId', 'typeAffiliationId'])
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
  public isEdit: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn() 
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => InfoEntity,
    info => info.typeAffiliations)
  public info: InfoEntity;

  @ManyToOne(() => TypeAffiliationEntity,
    typeAffiliation => typeAffiliation.infos)
  public typeAffiliation: TypeAffiliationEntity; 

  @OneToMany(() => AffiliationEntity,
    affiliation => affiliation.infoTypeAffiliation)
  public affiliations: AffiliationEntity[];
}