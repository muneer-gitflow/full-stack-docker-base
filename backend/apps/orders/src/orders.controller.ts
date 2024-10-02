import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { SERVICE_EVENTS } from 'libs/shared/service.events';
import { OrderService } from './orders.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @MessagePattern({ cmd: SERVICE_EVENTS.ORDER.GET_ORDERS })
  getOrders() {
    return this.orderService.getOrders();
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.ORDER.GET_ORDER })
  getOrder(@Payload() data: { id: string }) {
    return this.orderService.getOrder(data.id);
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.ORDER.PING })
  ping() {
    return 'pong from order';
  }
}
