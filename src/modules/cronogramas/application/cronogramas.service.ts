import { Injectable } from '@nestjs/common';
import { CronogramaRepository } from '../domain/cronograma.repository';

@Injectable()
export class CronogramasService {
  constructor(private cronogramaRepository: CronogramaRepository) {}
}