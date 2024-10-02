import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class PingController {
  @MessagePattern('ping.delivery')
  pingDelivery(@Payload() message: string): string {
    console.log('Received ping in delivery service:', message);
    return 'Pong from Delivery Service';
  }
}
