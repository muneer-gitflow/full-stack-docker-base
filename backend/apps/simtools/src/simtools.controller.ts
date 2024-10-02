import { Controller, Get, Post, Body } from '@nestjs/common';
import { SimtoolsService } from './simtools.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SERVICE_EVENTS } from 'libs/shared/service.events';

@Controller()
export class SimtoolsController {
  constructor(private readonly simtoolsService: SimtoolsService) {}

  @Get()
  getHello(): string {
    return this.simtoolsService.getHello();
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.SIMTOOLS.SIMULATE_DELIVERY })
  async simulateDelivery(@Payload() payload: { orderId: string }) {
    const { orderId } = payload;
    console.log('Received simulateDelivery message:', orderId);
    return await this.simtoolsService.simulateDelivery(orderId);
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.SIMTOOLS.PING })
  ping() {
    return 'pong from simtools';
  }

  @MessagePattern({ cmd: SERVICE_EVENTS.SIMTOOLS.CHECK_DELIVERY })
  async checkDelivery() {
    return this.simtoolsService.checkDelivery();
  }
}
