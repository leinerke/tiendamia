import { Test, TestingModule } from '@nestjs/testing';
import { RequestInfoService } from './request-info.service';

describe('Request Info Service', () => {
  let service: RequestInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestInfoService],
    }).compile();

    service = await module.resolve<RequestInfoService>(RequestInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
