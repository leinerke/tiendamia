import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestInfoService } from '../../common/services/request-info/request-info.service';

@Injectable()
export class RequestInfoMiddlewareMiddleware implements NestMiddleware {
  constructor(private requestInfoService: RequestInfoService) {}

  use(req: any, res: any, next: () => void) {
    this.requestInfoService.setRequestInfo(req);
    next();
  }
}
