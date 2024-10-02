import { Module } from '@nestjs/common';
import { CustomersResolver } from './customers.resolver';
import { SharedModule } from '@app/shared';
import { ConfigModule } from '@nestjs/config';
import { SERVICE_NAMES } from 'libs/shared/service.names';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule.registerRmq(
      SERVICE_NAMES.CUSTOMER,
      process.env.RABBITMQ_CUSTOMER_QUEUE,
    ),
  ],
  providers: [CustomersResolver],
})
export class CustomersModule {}
