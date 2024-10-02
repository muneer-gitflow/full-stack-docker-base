import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { Order } from './order.model';
import { OrdersService } from './orders.service';

@Resolver(() => Order)
export class OrdersResolver {
  constructor(private ordersService: OrdersService) {}

  @Query(() => [Order])
  async orders() {
    return this.ordersService.getOrders();
  }

  @Query(() => Order, { nullable: true })
  async order(@Args('id', { type: () => ID }) id: string) {
    return this.ordersService.getOrder(id);
  }
}
