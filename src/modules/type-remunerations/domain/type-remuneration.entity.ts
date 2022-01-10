import { InfoTypeRemunerationEntity } from 'src/modules/info-type-remunerations/domain/info-type-remuneration.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('p_type_remunerations')
export class TypeRemunerationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column()
  public description: string;

  @Column({ nullable: true })
  public extension: string;

  @Column('boolean', { default: true })
  public isBase: boolean;

  @Column('boolean', { default: false })
  public isBonification: boolean;

  @Column('boolean', { default: true })
  public isEdit: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => InfoTypeRemunerationEntity, info => info.typeRemuneration)
  public infos: InfoTypeRemunerationEntity[];
}