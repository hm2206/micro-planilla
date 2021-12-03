import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('historials')
export class HistorialEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'work_id' })
  public workId: number;

  @Column({ name: 'is_email' })
  public isEmail: boolean;

  @Column({ name: 'send_email' })
  public sendEmail: boolean;

  @Column({ name: 'token_verify' })
  public tokenVerify: string;
}