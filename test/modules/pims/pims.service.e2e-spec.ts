import { Test } from '@nestjs/testing';
import { PimsService } from '../../../src/modules/pims/application/pims.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PimRepository } from '../../../src/modules/pims/domain/pim.repository';

describe('PimsService', () => {
  let service: PimsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([PimRepository])
      ],
      providers: [PimsService]
    }).compile();

    service = await moduleRef.resolve<PimsService>(PimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});