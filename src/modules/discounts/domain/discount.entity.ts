import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_discounts')
export class DiscountEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public historialId: number;

  @Column()
  public typeDiscountId: number;

  @Column('boolean')
  public isEdit: boolean;

  @Column('boolean')
  public isModify: boolean;

  @Column('boolean')
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
  
}