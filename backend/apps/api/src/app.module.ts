import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { HealthModule } from './health/health.module';
import { SimtoolsModule } from './simtools/simtools.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
    }),
    UsersModule,
    CustomersModule,
    HealthModule,
    SimtoolsModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
