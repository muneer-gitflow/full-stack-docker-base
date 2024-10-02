import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { createClient } from '@supabase/supabase-js';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class SharedModule {
  static registerRmq(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get('RABBITMQ_USER');
          const PASSWORD = configService.get('RABBITMQ_PASS');
          const HOST = configService.get('RABBITMQ_HOST');

          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
              queue,
              queueOptions: {
                durable: true,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];

    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }

  static registerSupabase(providerName: string): DynamicModule {
    return {
      module: SharedModule,
      providers: [
        {
          provide: providerName,
          useFactory: (configService: ConfigService) => {
            const supabaseUrl = configService.get<string>('SUPABASE_URL');
            const supabaseKey = configService.get<string>('SUPABASE_KEY');
            return createClient(supabaseUrl, supabaseKey);
          },
          inject: [ConfigService],
        },
      ],
      exports: [providerName],
    };
  }
}
