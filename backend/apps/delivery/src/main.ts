import { NestFactory } from '@nestjs/core';
import { DeliveryModule } from './delivery.module';
import { SharedConfigService } from '@app/shared/config/shared-config.service';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(DeliveryModule);

  const configService = app.get(SharedConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_DELIVERY_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();
  console.log('Delivery microservice is running 🚀');
}
bootstrap();
