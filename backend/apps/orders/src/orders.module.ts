import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule, SharedService } from '@app/shared';
import { SERVICE_NAMES } from 'libs/shared/service.names';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule.registerRmq(
      SERVICE_NAMES.ORDER,
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
  ],
  controllers: [OrderController],
  providers: [OrderService, SharedService],
})
export class OrderModule {}
