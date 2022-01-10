import { InfoTypeAportationEntity } from "../../../modules/info-type-aportations/domain/info-type-aportation.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_type_aportations')
export class TypeAportationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public percent: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public min: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public default: number;

  @Column({ unique: true })
  public extension: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoTypeAportationEntity, info => info.typeAportation)
  public infos: InfoTypeAportationEntity[];
}