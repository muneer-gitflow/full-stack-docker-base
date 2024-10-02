import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { HealthCheck } from './health.model';
import { SERVICE_NAMES } from 'libs/shared/service.names';
import { SERVICE_EVENTS } from 'libs/shared/service.events';

@Resolver(() => HealthCheck)
export class HealthResolver {
  private readonly logger = new Logger(HealthResolver.name);
  constructor(
    @Inject(SERVICE_NAMES.CUSTOMER) private customerService: ClientProxy,
    @Inject(SERVICE_NAMES.DELIVERY) private deliveryService: ClientProxy,
    @Inject(SERVICE_NAMES.SIMTOOLS) private simtoolsService: ClientProxy,
    @Inject(SERVICE_NAMES.ORDER) private orderService: ClientProxy,
  ) {}

  @Query(() => HealthCheck)
  healthCheck() {
    return {};
  }

  @ResolveField()
  async customer(@Parent() healthCheck: HealthCheck): Promise<string> {
    try {
      const result = await lastValueFrom(
        this.customerService.send({ cmd: SERVICE_EVENTS.CUSTOMER.PING }, {}),
      );
      return result;
    } catch (error) {
      this.logger.error('Health check failed for customer service:', error);
      return 'Customer service is Unhealthy';
    }
  }

  @ResolveField()
  async delivery(@Parent() healthCheck: HealthCheck): Promise<string> {
    try {
      const result = await lastValueFrom(
        this.deliveryService.send({ cmd: SERVICE_EVENTS.DELIVERY.PING }, {}),
      );
      return result;
    } catch (error) {
      this.logger.error('Health check failed for delivery service:', error);
      return 'Delivery service is Unhealthy';
    }
  }

  @ResolveField()
  async simtools(@Parent() healthCheck: HealthCheck): Promise<{ status: string; delivery: string }> {
    try {
      const simtoolsStatus = await lastValueFrom(
        this.simtoolsService.send({ cmd: SERVICE_EVENTS.SIMTOOLS.PING }, {}),
      );
      
      // Check if delivery is accessible from simtools
      const deliveryFromSimtools = await lastValueFrom(
        this.simtoolsService.send({ cmd: SERVICE_EVENTS.SIMTOOLS.CHECK_DELIVERY }, {}),
      );

      return {
        status: simtoolsStatus,
        delivery: deliveryFromSimtools,
      };
    } catch (error) {
      this.logger.error('Health check failed for simtools service:', error);
      return {
        status: 'Simtools service is Unhealthy',
        delivery: 'Unable to check delivery from simtools',
      };
    }
  }

  @ResolveField()
  async order(@Parent() healthCheck: HealthCheck): Promise<string> {
    try {
      const result = await lastValueFrom(
        this.orderService.send({ cmd: SERVICE_EVENTS.ORDER.PING }, {}),
      );
      return result;
    } catch (error) {
      this.logger.error('Health check failed for order service:', error);
      return 'Order service is Unhealthy';
    }
  }
}
