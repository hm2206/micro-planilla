import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_type_aportations')
export class TypeAportationEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public name: string;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public porcentaje: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public minimo: number;

  @Column('decimal', { precision: 12, scale: 2, default: 0 })
  public default: number;

  @Column()
  public extension: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}