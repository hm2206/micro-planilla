import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_type_discounts')
export class TypeDiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public code: string;

  @Column()
  public description: string;

  @Column('boolean', { default: true })
  public isEdit: boolean;

  @Column('boolean', { default: true })
  public plame: boolean;

  @Column('boolean', { default: false })
  public judicial: boolean;

  @Column('boolean', { default: false })
  public except: boolean;

  @Column('boolean', { default: false })
  public renta: boolean;

  @Column('boolean', { default: false })
  public isEscalafon: boolean;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}