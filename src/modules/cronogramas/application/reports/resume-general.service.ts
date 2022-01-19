import { Injectable } from "@nestjs/common";
import { CronogramaRepository } from "../../domain/cronograma.repository";

@Injectable()
export class ResumeGeneralService {
  constructor(private cronogramaRepository: CronogramaRepository) { }

}