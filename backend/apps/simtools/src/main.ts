import { NestFactory } from '@nestjs/core';
import { SimtoolsModule } from './simtools.module';
import { SharedConfigService } from '@app/shared/config/shared-config.service';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(SimtoolsModule);

  const configService = app.get(SharedConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('RABBITMQ_SIMTOOLS_QUEUE');

  app.connectMicroservice(sharedService.getRmqOptions(queue));
  await app.startAllMicroservices();
  await app.listen(configService.get('SIMTOOLS_PORT'));
  console.log('Simtools microservice is running');
}
bootstrap();
