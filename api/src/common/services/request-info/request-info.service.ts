import { Injectable, Scope } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request } from 'express';
import { IRequestInfo } from '../../interfaces/request-info';

@Injectable({ scope: Scope.REQUEST })
export class RequestInfoService {
  private requestInfo: IRequestInfo;

  setRequestInfo(request: Request): void {
    const { ip, headers } = request;
    const userAgent = request.get('user-agent') || '';
    if (!headers['x-uow']) {
      const uow = randomUUID();
      headers['x-uow'] = `GEO${uow.split('-')[0]}`;
    }
    if (!headers['requestID']) {
      headers['requestID'] = randomUUID();
    }
    this.requestInfo = {
      host: `${ip}:${userAgent}`,
      userID: headers['x-userid'] || 'unknown',
      UOW: headers['x-uow'],
      requestID: headers['requestID'],
    };
  }

  getRequestInfo(): IRequestInfo {
    return this.requestInfo;
  }
}
