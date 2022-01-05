import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("type_cargos")
export class TypeCargoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "nombre" })
  name: string;

  @Column({ name: "estado", type: "boolean", default: true })
  state: boolean;
}