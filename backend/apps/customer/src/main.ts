import { NestFactory } from '@nestjs/core';
import { CustomerModule } from './customer.module';
import { SharedConfigService } from '@app/shared/config/shared-config.service';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(CustomerModule);

  const configService = app.get(SharedConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_CUSTOMER_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();
  console.log('Customer microservice is running');
}
bootstrap();
