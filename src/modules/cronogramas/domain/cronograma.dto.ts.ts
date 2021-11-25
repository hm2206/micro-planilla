import { IsNotEmpty } from 'class-validator';

export class FilterTypeObject {
  @IsNotEmpty()
  public cargoId: number
}