import { Controller, Get, Post, Param, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../application/files.service';

@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public async store(@UploadedFile() file: Express.Multer.File) {
    return await this.filesService.createFile({
      fileableId: 1,
      fileableType: "Student",
      name: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      buffer: file.buffer
    });
  }

  @Get(':id/binary')
  public async binary(@Param('id') id: number): Promise<StreamableFile> {
    const binary = await this.filesService.findFileBinary(id);
    return new StreamableFile(binary.buffer, {
      type: binary.type
    });
  }
}