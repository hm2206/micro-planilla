import { HistorialEntity } from "../../../modules/historial/domain/historial.entity";
import { WorkEntity } from "../../../modules/works/domain/work.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_afps')
export class AfpEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column()
  public typeAfpCode: string;

  @Column()
  public typeAfp: string;

  @Column()
  public typeDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public percent: number;

  @Column()
  public aportDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public aportPercent: number;

  @Column()
  public primaDiscountId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public primaPercent: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public primaLimit: number;

  @Column('boolean', { default: true })
  public isPrivate: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => WorkEntity, work => work.afp)
  public works: WorkEntity[];

  @OneToMany(() => HistorialEntity, history => history.afp)
  public historials: HistorialEntity[];
}