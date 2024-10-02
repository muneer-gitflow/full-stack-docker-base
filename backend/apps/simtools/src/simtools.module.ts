import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SimtoolsController } from './simtools.controller';
import { SimtoolsService } from './simtools.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { SharedModule, SharedService } from '@app/shared';
import { SERVICE_NAMES } from 'libs/shared/service.names';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    TerminusModule,
    SharedModule.registerRmq(
      SERVICE_NAMES.DELIVERY,
      process.env.RABBITMQ_DELIVERY_QUEUE,
    ),
    SharedModule.registerRmq(
      SERVICE_NAMES.SIMTOOLS,
      process.env.RABBITMQ_SIMTOOLS_QUEUE,
    ),
  ],
  controllers: [SimtoolsController, HealthController],
  providers: [SimtoolsService, SharedService],
})
export class SimtoolsModule {}
