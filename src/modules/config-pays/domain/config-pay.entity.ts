import { CronogramaEntity } from "src/modules/cronogramas/domain/cronograma.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypePayModeEnum } from "../../../modules/type-pays/domain/type-pay.enum";

@Entity('p_config_pays')
export class ConfigPayEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public cronogramaId: number;

  @Column()
  public typeCategoryId: number;

  @Column()
  public typePayId: number;

  @Column()
  public prefix: string;

  @Column()
  public index: string;

  @Column()
  public body: string;

  @Column()
  public format: string;

  @Column('enum', { enum: TypePayModeEnum })
  public mode: TypePayModeEnum;

  @Column('boolean', { default: true })
  public state: boolean

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => CronogramaEntity,
    cronograma => cronograma.configPays, {
      onDelete: 'CASCADE'
  })
  public cronograma: CronogramaEntity;
}