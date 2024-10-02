import { Module } from '@nestjs/common';
import { SimtoolsResolver } from './simtools.resolver';
import { SimtoolsService } from './simtools.service';
import { SharedModule } from '@app/shared';
import { SERVICE_NAMES } from 'libs/shared/service.names';
@Module({
  imports: [
    SharedModule.registerRmq(
      SERVICE_NAMES.SIMTOOLS,
      process.env.RABBITMQ_SIMTOOLS_QUEUE,
    ),
  ],
  providers: [SimtoolsResolver, SimtoolsService],
})
export class SimtoolsModule {}
