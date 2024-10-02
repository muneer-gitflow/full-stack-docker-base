import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class DeliveryService {
  private readonly logger = new Logger(DeliveryService.name);
  private deliveries = [
    { id: '1', orderId: 'ORD001', status: 'In Transit' },
    { id: '2', orderId: 'ORD002', status: 'Delivered' },
    { id: '3', orderId: 'ORD003', status: 'Pending' },
    { id: '4', orderId: 'ORD004', status: 'Pending' },
  ];

  getDeliveries() {
    return this.deliveries;
  }

  updateDelivery(message: any) {
    this.logger.log(
      `Received update delivery message: ${JSON.stringify(message)}`,
    );
    const { orderId, status } = message;
    const delivery = this.deliveries.find((d) => d.orderId === orderId);

    if (!delivery) {
      this.logger.error(`Delivery not found for order ${orderId}`);
      return { error: 'Delivery not found' };
    }

    this.logger.log(
      `Updating delivery status to ${status} for order ${orderId}`,
    );
    delivery.status = status;

    return delivery;
  }
}
