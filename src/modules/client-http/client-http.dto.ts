import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class InputGetFile {
  @IsNotEmpty()
  @IsUrl()
  public url: string;

  @IsNotEmpty()
  @IsString()
  public extname: string;

  @IsString()
  @IsOptional()
  public dir = 'media';
}