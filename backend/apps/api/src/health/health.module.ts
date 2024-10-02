import { Module } from '@nestjs/common';

import { SharedModule } from '@app/shared';
import { HealthResolver } from './health.resolver';
import { SERVICE_NAMES } from 'libs/shared/service.names';

@Module({
  imports: [
    SharedModule.registerRmq(
      SERVICE_NAMES.CUSTOMER,
      process.env.RABBITMQ_CUSTOMER_QUEUE,
    ),
    SharedModule.registerRmq(
      SERVICE_NAMES.DELIVERY,
      process.env.RABBITMQ_DELIVERY_QUEUE,
    ),
    SharedModule.registerRmq(
      SERVICE_NAMES.SIMTOOLS,
      process.env.RABBITMQ_SIMTOOLS_QUEUE,
    ),
    SharedModule.registerRmq(
      SERVICE_NAMES.ORDER,
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
  ],
  providers: [HealthResolver],
})
export class HealthModule {}
