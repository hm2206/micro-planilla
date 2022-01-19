import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("files")
export class FileEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public fileableType: string;

  @Column()
  public fileableId: number;

  @Column()
  public name: string;

  @Column({ unique: true })
  public path: string;

  @Column()
  public extname: string

  @Column()
  public size: number;

  @Column()
  public mimeType: string;

  @Column('boolean', { default: true })
  public principal: boolean;

  @Column('boolean', { default: true })
  public isPublic: boolean;

  @Column('boolean', { default: true })
  public state: boolean;
  
  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;
}