import { NestFactory } from '@nestjs/core';
import { OrderModule } from './orders.module';
import { SharedConfigService } from '@app/shared/config/shared-config.service';
import { SharedService } from '@app/shared';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(OrderModule);
  Logger.debug('Order microservice is starting ----');

  const configService = app.get(SharedConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_ORDERS_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();
  console.log('Order microservice is running');
  console.log('Hot reload is active. Waiting for changes...');
}
bootstrap();
