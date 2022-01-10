import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('p_info_type_sindicatos')
export class InfoTypeSindicatoEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public infoId: number;

  @Column()
  public typeSindicatoId: number;

  @Column('boolean', { default: true })
  public state: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}