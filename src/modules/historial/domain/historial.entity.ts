import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('historials')
export class HistorialEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public cronogramaId: number;
  
  @Column()
  public infoId: number;

  @Column()
  public pimId: number;

  @Column()
  public dependenciaId: number;

  @Column()
  public perfilId: number;

  @Column()
  public afpId: number;

  @Column('date', { nullable: true })
  public affiliationOfDate: Date;

  @Column()
  public numberOfCussp: string;

  @Column('boolean', { default: true })
  public isPrimaSeguro = true;

  @Column({ nullable: true })
  public numberOfEssalud: string;

  @Column()
  public bankId: number;

  @Column({ nullable: true })
  public numberOfAccount: string;

  @Column('boolean')
  public isCheck: boolean;

  @Column({ nullable: true })
  public plaza: string;

  @Column('boolean', { default: false })
  public sendEmail = false;

  @Column('boolean')
  public isEmail: boolean;

  @Column({ nullable: true })
  public tokenVerify : string;

  @Column('boolean')
  public isPay: boolean;

  @Column()
  public days: number;

  @Column('boolean')
  public state = true;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}