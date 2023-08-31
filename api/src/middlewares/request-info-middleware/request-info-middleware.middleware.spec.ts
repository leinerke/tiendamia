import { RequestInfoService } from '../../common/services/request-info/request-info.service';
import { RequestInfoMiddlewareMiddleware } from './request-info-middleware.middleware';

describe('RequestInfoMiddlewareMiddleware', () => {
  it('should be defined', () => {
    expect(
      new RequestInfoMiddlewareMiddleware(new RequestInfoService()),
    ).toBeDefined();
  });
});
