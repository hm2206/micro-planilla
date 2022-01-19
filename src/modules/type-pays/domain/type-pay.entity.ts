import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TypePayModeEnum } from "./type-pay.enum";

@Entity('p_type_pays')
export class ConfigPayEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public planillaId: number;

  @Column()
  public typeCategoryId: number;

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