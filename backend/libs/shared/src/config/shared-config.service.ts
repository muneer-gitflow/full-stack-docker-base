import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SharedConfigService {
  constructor(private configService: ConfigService) {}

  get<T = any>(key: string): T {
    return this.configService.get<T>(key);
  }

  getRabbitmqConfig() {
    return {
      user: this.get<string>('RABBITMQ_USER'),
      password: this.get<string>('RABBITMQ_PASS'),
      host: this.get<string>('RABBITMQ_HOST'),
      customerQueue: this.get<string>('RABBITMQ_CUSTOMER_QUEUE'),
      deliveryQueue: this.get<string>('RABBITMQ_DELIVERY_QUEUE'),
    };
  }

  getKafkaConfig() {
    return {
      brokers: this.get<string>('KAFKA_BROKERS')?.split(',') || [
        'localhost:9092',
      ],
    };
  }
}
