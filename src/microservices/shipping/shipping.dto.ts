import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  public displayLink?: string;

  @IsString()
  @IsOptional()
  public link?: string;

  @IsNotEmpty()
  public subject: string;

  @IsString()
  @IsOptional()
  public template?: string = 'default';

  @IsString()
  @IsOptional()
  public content: string;
}