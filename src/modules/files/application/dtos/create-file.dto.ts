
export class CreateFileDto {
  public fileableType: string;
  public fileableId: number;
  public name: string;
  public size: number;
  public mimeType: string;
  public principal?: boolean = true;
  public buffer: Buffer;
  public isPublic?: boolean = true;
}