import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import { OrderStatus } from './dto';
import { SERVICE_EVENTS } from 'libs/shared/service.events';
@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @MessagePattern({ cmd: SERVICE_EVENTS.CUSTOMER.PING })
  pingCustomer() {
    return 'pong from customer';
  }
}
