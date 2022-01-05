import { Test } from '@nestjs/testing';
import { PimsService } from '../../../src/modules/pims/application/pims.service';
import { PimEntity } from '../../../src/modules/pims/domain/pim.entity';
import { ICreatePimDto } from '../../../src/modules/pims/application/dtos/create-pim.dto';
import { PimsModule } from '../../../src/modules/pims/pims.module';
import { DatabaseModule } from '../../../src/database/database.module';

describe('PimsService', () => {
  let service: PimsService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule,
        PimsModule
      ],
    }).compile();

    service = await moduleRef.get<PimsService>(PimsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be object instance PimEntity', async () => {
    const code = `${Math.round(Math.random() * 90)}`;
    const payload: ICreatePimDto = {
      code: code,
      metaId: 1,
      cargoId: 1,
      year: 2022,
      money: 200000
    }

    const result = await service.createPim(payload);
    expect(result).toBeInstanceOf(PimEntity);
  });
});