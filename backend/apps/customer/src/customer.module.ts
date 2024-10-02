import { SharedModule, SharedService } from '@app/shared';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { SERVICE_NAMES } from 'libs/shared/service.names';

@Module({
  imports: [
    SharedModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule.registerRmq(
      SERVICE_NAMES.DELIVERY,
      process.env.RABBITMQ_DELIVERY_QUEUE,
    ),
  ],
  controllers: [CustomerController],
  providers: [CustomerService, SharedService],
})
export class CustomerModule {}
