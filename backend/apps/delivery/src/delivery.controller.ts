import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeliveryService } from './delivery.service';
import { SERVICE_EVENTS } from 'libs/shared/service.events';
import { Logger } from '@nestjs/common';

@Controller()
export class DeliveryController {
  private readonly logger = new Logger(DeliveryController.name);
  constructor(private readonly deliveryService: DeliveryService) {}

  @MessagePattern({ cmd: SERVICE_EVENTS.DELIVERY.GET_DELIVERY })
  getDeliveries() {
    return this.deliveryService.getDeliveries();
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.DELIVERY.PING })
  pingDelivery() {
    this.logger.log('Received ping in delivery service');
    return 'pong from delivery';
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.DELIVERY.UPDATE_DELIVERY })
  async updateDelivery(@Payload() message: any) {
    this.logger.log('Received update delivery message');
    return await this.deliveryService.updateDelivery(message);
  }

  //   @MessagePattern({ cmd: SERVICE_EVENTS.DELIVERY.UPDATE_DELIVERY })
  //   updateDelivery() {
  //     return 'received update delivery message';
  //     // return this.deliveryService.updateDelivery(message);
  //   }
}
