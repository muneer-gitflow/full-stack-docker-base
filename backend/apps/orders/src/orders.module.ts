import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SERVICE_NAMES } from 'libs/shared/service.names';
import { OrderController } from './orders.controller';
import { OrderService } from './orders.service';
import { SharedModule, SharedService } from '@app/shared';
import { SharedConfigService } from '@app/shared/config/shared-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SharedModule.registerRmq(
      SERVICE_NAMES.ORDER,
      process.env.RABBITMQ_ORDERS_QUEUE,
    ),
    SharedModule.registerSupabase('SUPABASE_CLIENT'),
    SharedModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, SharedService, SharedConfigService],
})
export class OrderModule {}
