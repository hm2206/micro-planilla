import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { TypeRemunerationEntity } from "src/modules/type-remunerations/domain/type-remuneration.entity";

@Entity('p_info_type_remunerations')
@Unique('unique-info-type-remunerations', ['infoId', 'typeRemunerationId'])
export class InfoTypeRemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public infoId: number;

  @Column()
  public typeRemunerationId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('boolean')
  public isBase: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => InfoEntity, info => info.typeRemunerations)
  public info: InfoEntity;

  @ManyToOne(() => TypeRemunerationEntity, typeRemuneration => typeRemuneration.infos)
  public typeRemuneration: TypeRemunerationEntity;
}