import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SendMailDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public subject: string;

  @IsString()
  @IsOptional()
  public template = 'default';

  @IsString()
  @IsOptional()
  public content: string;
}