import { Module } from '@nestjs/common';
import { OrdersResolver } from './orders.resolver';
import { OrdersService } from './orders.service';
import { SharedModule } from '@app/shared';
import { SERVICE_NAMES } from 'libs/shared/service.names';

@Module({
  imports: [
    SharedModule.registerRmq(
      SERVICE_NAMES.ORDER,
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
  ],
  providers: [OrdersResolver, OrdersService],
})
export class OrdersModule {}