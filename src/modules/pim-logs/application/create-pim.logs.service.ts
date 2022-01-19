import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { FilesService } from "../../../modules/files/application/files.service";
import { PimLogEntity } from "../domain/pim-log.entity";
import { PimLogRepository } from "../domain/pim-log.repository";
import { ICreatePimLogDto } from "./dtos/create-pim-log.dto";

@Injectable()
export class CreatePimLogsService {
  constructor(private pimLogRepository: PimLogRepository,
    private filesService: FilesService) { }
  
  public async createPimLog(createPimLogDto: ICreatePimLogDto, file?: Express.Multer.File):
    Promise<PimLogEntity>  {
    try {
      const newPimLog = this.pimLogRepository.create(createPimLogDto);
      const pimLog = await this.pimLogRepository.save(newPimLog);
      // save file
      if (file) return await this.saveFile(pimLog, file);
      // response 
      return pimLog;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  public async saveFile(pim: PimLogEntity, file: Express.Multer.File):
    Promise<PimLogEntity>  {
    try {
      // save file
      const currentFile = await this.filesService.createFile({
        fileableType: PimLogEntity.name,
        fileableId: pim.id,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype,
        buffer: file.buffer
      });
      // update id
      pim.fileId = currentFile.id;
      return await this.pimLogRepository.save(pim);
    } catch (error) {
      await this.pimLogRepository.delete(pim.id);
      throw new InternalServerErrorException(error);
    }
  }
}