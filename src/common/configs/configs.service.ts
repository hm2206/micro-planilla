import { Injectable } from '@nestjs/common';
import { ConfigsEnum } from './configs.enum';

@Injectable()
export class ConfigsService {
  public set(key: string, value: any) {
    process.env[key] = value;
  }

  public get(value: ConfigsEnum, defaultValue?: string): string | any {
    return process.env[value] || defaultValue;
  }
}