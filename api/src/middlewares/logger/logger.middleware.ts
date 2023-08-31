import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RequestInfoService } from '../../common/services/request-info/request-info.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly logger: Logger,
    private requestInfoService: RequestInfoService,
  ) {}

  use(req: Request, res: Response, next: () => void) {
    const requestInfo = this.requestInfoService.getRequestInfo();
    const { method, originalUrl, body } = req;

    if (method !== 'GET') {
      this.logger.log({
        message: `${method} to ${originalUrl}`,
        body,
        ...requestInfo,
      });
    } else {
      this.logger.log({
        message: `${method} to ${originalUrl}`,
        ...requestInfo,
      });
    }
    next();
  }
}
