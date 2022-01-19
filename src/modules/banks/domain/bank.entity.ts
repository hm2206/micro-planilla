import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { InfoEntity } from "../../../modules/infos/domain/info.entity";
import { HistorialEntity } from "../../../modules/historial/domain/historial.entity";

@Entity('p_banks')
export class BankEntity {
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

  @OneToMany(() => InfoEntity, info => info.bank)
  public infos: InfoEntity[];

  @OneToMany(() => HistorialEntity, history => history.bank)
  public historials: HistorialEntity[];
}