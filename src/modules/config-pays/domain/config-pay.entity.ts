import { TypePayModeEnum } from "src/modules/type-pays/domain/type-pay.enum";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
}