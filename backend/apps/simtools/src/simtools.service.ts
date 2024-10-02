import { Injectable, Inject, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SERVICE_EVENTS } from 'libs/shared/service.events';
import { SERVICE_NAMES } from 'libs/shared/service.names';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class SimtoolsService {
  private readonly logger = new Logger(SimtoolsService.name);
  constructor(
    @Inject(SERVICE_NAMES.DELIVERY) private deliveryClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async simulateDelivery(orderId: string) {
    const statuses = [
      'PICKED_UP',
      'IN_TRANSIT',
      'OUT_FOR_DELIVERY',
      'DELIVERED',
    ];

    for (const status of statuses) {
      const message = {
        orderId,
        status,
        timestamp: new Date().toISOString(),
      };

      try {
        this.deliveryClient.emit(
          { cmd: SERVICE_EVENTS.DELIVERY.UPDATE_DELIVERY },
          message,
        );
      } catch (error) {
        console.error(error);
        throw error;
      }

      // Simulate time passing between status updates
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }

    return { message: `Delivery simulation completed for order: ${orderId}` };
  }

  async checkDelivery(): Promise<string> {
    try {
      const result = await lastValueFrom(
        this.deliveryClient.send({ cmd: SERVICE_EVENTS.DELIVERY.PING }, {}),
      );
      return `Delivery service is accessible from SimTools: ${result}`;
    } catch (error) {
      console.error('Failed to check delivery from simtools:', error);
      return 'Delivery service is not accessible from SimTools';
    }
  }

  async updateDelivery(): Promise<string> {
    try {
      const result = await lastValueFrom(
        this.deliveryClient.emit(
          { cmd: SERVICE_EVENTS.DELIVERY.UPDATE_DELIVERY },
          {},
        ),
      );
      return `Delivery service is accessible from SimTools: ${result}`;
    } catch (error) {
      console.error('Failed to check delivery from simtools:', error);
      return 'Delivery service is not accessible from SimTools';
    }
  }
}
