import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity('p_details')
@Unique('u_details', ['discountId', 'typeDetailId'])
export class DetailEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public discountId: number;

  @Column()
  public typeDetailId: number;

  @Column('decimal', { precision: 12, scale: 2 })
  public amount: number;

  @Column('text', { nullable: true })
  public observation: string;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}