import { Module } from '@nestjs/common';
import { RequestInfoService } from './services/request-info/request-info.service';

@Module({
  providers: [RequestInfoService],
  exports: [RequestInfoService],
})
export class CommonModule {}
