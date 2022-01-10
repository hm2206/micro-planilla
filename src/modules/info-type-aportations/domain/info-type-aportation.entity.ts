import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { TypeAportationEntity } from "../../../modules/type-aportations/domain/type-aportation.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_info_type_aportations')
export class InfoTypeAportationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public infoId: number;

  @Column()
  public typeAportationId: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => InfoEntity, info => info.typeAportations)
  public info: InfoEntity;

  @ManyToOne(() => TypeAportationEntity, typeAportation => typeAportation.infos)
  public typeAportation: TypeAportationEntity;
}