import { Logger } from '@nestjs/common';
import { LoggerMiddleware } from './logger.middleware';
import { RequestInfoService } from '../../common/services/request-info/request-info.service';

describe('LoggerMiddleware', () => {
  it('should be defined', () => {
    expect(
      new LoggerMiddleware(new Logger(), new RequestInfoService()),
    ).toBeDefined();
  });
});
