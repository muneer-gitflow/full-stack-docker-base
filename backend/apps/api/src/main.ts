import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Your Next.js app's URL
    credentials: true,
  });

  await app.listen(3001);
  console.log('API service is running on port 3001 🚀');
}
bootstrap();
