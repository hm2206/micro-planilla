import { HttpException } from "@nestjs/common";


export class RequiredFileException extends HttpException {
  constructor() {
    super("El archivo es requerido", 402);
  }
}