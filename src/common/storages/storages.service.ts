import { StorageService } from '@codebrew/nestjs-storage';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { fstatSync, openSync } from "fs";
import * as fs from 'fs'; 
import { resolve } from 'path';

@Injectable()
export class StoragesService {
  constructor(private storageService: StorageService) { }
  
  private currentDisk = 'local';

  public pathStorage(path) {
    return resolve(__dirname, `../../../storage`, path);
  }

  public disk(name?: string) {
    this.currentDisk = name || this.currentDisk;
    return this.storageService.getDisk(this.currentDisk);
  }

  public async listFolder(path) {
    const results = [];
    const tmpPath = this.pathStorage(path);
    fs.readdirSync(tmpPath).forEach(f => {
      const currentPath = this.pathStorage(`${path}/${f}`);
      const openPath = openSync(currentPath, 'r');
      const fstatPath = fstatSync(openPath);
      results.push({
        type: fstatPath.isDirectory() ? 'Directory' : 'File',
        path: currentPath,
        name: f,
        size: fstatPath.size
      })
    });
    // response
    return results;
  }

  public validateMimeType(mimeType: string, compareMimeType: string[]): boolean {
    if (!compareMimeType) return;
    if (compareMimeType.includes(mimeType)) return true;
    throw new InternalServerErrorException(`
      EL tipo del archivo no es: [${compareMimeType.join(', ')}]`
    );
  } 
}