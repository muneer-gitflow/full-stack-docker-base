import { Injectable, Inject } from '@nestjs/common';
import { Customer, OrderStatus } from './dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class CustomerService {
  private customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
    },
  ];

  private orderStatuses: Map<string, OrderStatus> = new Map();

  updateOrderStatus(status: OrderStatus) {
    this.orderStatuses.set(status.orderId, status);
    console.log(`Updated order status: ${JSON.stringify(status)}`);
  }

  getOrderStatus(orderId: string): OrderStatus | undefined {
    return this.orderStatuses.get(orderId);
  }

  getCustomers() {
    return this.customers;
  }
}
