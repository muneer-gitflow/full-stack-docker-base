import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  private orders = [
    {
      id: '1',
      customerId: '1',
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '1',
          name: 'Product 1',
          price: 100,
        },
      ],
    },
    {
      id: '2',
      customerId: '2',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '2',
          name: 'Product 2',
          price: 200,
        },
      ],
    },
    {
      id: '3',
      customerId: '3',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 30 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '3',
          name: 'Product 3',
          price: 300,
        },
      ],
    },
    {
      id: '4',
      customerId: '4',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '4',
          name: 'Product 4',
          price: 400,
        },
      ],
    },
    {
      id: '5',
      customerId: '5',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 30 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '5',
          name: 'Product 5',
          price: 500,
        },
      ],
    },
    {
      id: '6',
      customerId: '6',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 30 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '6',
          name: 'Product 6',
          price: 600,
        },
      ],
    },
    {
      id: '7',
      customerId: '7',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 30 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '7',
          name: 'Product 7',
          price: 700,
        },
      ],
    },
    {
      id: '8',
      customerId: '8',
      status: 'DELIVERED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      eta: new Date(new Date().getTime() + 1 * 30 * 60 * 1000).toISOString(),
      deliveryAddress: '123 Main St, Anytown, USA',
      items: [
        {
          id: '8',
          name: 'Product 8',
          price: 800,
        },
      ],
    },
  ];

  getOrders() {
    return this.orders;
  }

  getOrder(id: string) {
    return this.orders.find((order) => order.id === id);
  }
}
