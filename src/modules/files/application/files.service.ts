import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { FileRepository } from '../domain/file.repository';
import { CreateFileDto } from './dtos/create-file.dto';
import * as fs from 'fs';
import * as path from 'path';
import ObjectId from 'bson-objectid';
import { Connection } from 'typeorm';
import { FileEntity } from '../domain/file.entity';
import { RequiredFileException } from '../exceptions/required-file.exception';
import { StoragesService } from '../../../common/storages/storages.service';
import { basename } from 'path';

@Injectable()
export class FilesService {
  constructor(
    private connection: Connection,
    private storagesService: StoragesService,
    private fileRepository: FileRepository) { }
  
  public async findFile(id: any) {
    return await this.fileRepository.findOneOrFail(id);
  }

  public async findFileBinary(id: number, isPublic = true): Promise<ReadBinary> {
    try {
      const file = await this.fileRepository.findOneOrFail({ isPublic, id });
      const base = basename(file.path);
      const buffer = await this.storagesService.disk().getBuffer(base);
      return {
        buffer: buffer.content,
        type: file.mimeType
      };
    } catch (error) {
      throw new NotFoundException("No se encontró el archivo");
    }
  }

  public async createFile(payload: CreateFileDto,
    typeMimes?: string[],
    limitSize?: number): Promise<FileEntity> {
    if (!payload?.buffer) throw new RequiredFileException();
    // validar mime
    if (!typeMimes) this.storagesService.validateMimeType(
      payload.mimeType,
      typeMimes
    )
    // validar size
    if (limitSize) this.validateSize(payload.size, limitSize);
    // process
    const extname = path.extname(payload.name).replace('.', ''); 
    const fileToken = new ObjectId().toHexString()
    const softName = `${fileToken}.${extname}`;
    const realPath = this.storagesService.pathStorage(softName);
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    // processamos
    try {
      // save file on filesystem
      await this.storagesService.disk().put(softName, payload.buffer);
      const partial = Object.assign({}, {
        ...payload,
        path: realPath,
        extname
      });
      // save file on database
      const newFile = this.fileRepository.create(partial);
      return await this.fileRepository.save(newFile);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      const existsFile = fs.existsSync(realPath);
      if (existsFile) fs.rmdirSync(realPath, { recursive: true });
      throw new InternalServerErrorException("No se pudo guardar el archivo");
    }
  }

  private validateSize(size: number, limitSize?: number): void {
    if (!limitSize) return;
    if (size <= limitSize) return;
    throw new InternalServerErrorException(`El tamaño límite del archivo es ${limitSize}`);
  }

  public async deleteFile(id: number) {
    try {
      const file = await this.fileRepository.findOneOrFail(id);
      const realName = path.basename(file.path);
      // eliminar archivo
      const { exists } = await this.storagesService.disk().exists(realName);
      if (exists) await this.storagesService.disk().delete(realName);
      await this.fileRepository.delete(id);
    } catch (error) {
      throw new InternalServerErrorException("No se pudo eliminar el archivo");
    }
  } 
}