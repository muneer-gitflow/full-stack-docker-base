import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SERVICE_NAMES } from 'libs/shared/service.names';
import { SERVICE_EVENTS } from 'libs/shared/service.events';
import { Order } from './order.model';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(SERVICE_NAMES.ORDER) private orderClient: ClientProxy,
  ) {}

  async getOrders(): Promise<Order[]> {
    return lastValueFrom(
      this.orderClient.send({ cmd: SERVICE_EVENTS.ORDER.GET_ORDERS }, {})
    );
  }

  async getOrder(id: string): Promise<Order> {
    return lastValueFrom(
      this.orderClient.send({ cmd: SERVICE_EVENTS.ORDER.GET_ORDER }, { id })
    );
  }
}