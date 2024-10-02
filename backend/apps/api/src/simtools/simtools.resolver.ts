import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SimtoolsService } from './simtools.service';
import { SimulationResult } from './simtools.types';

@Resolver()
export class SimtoolsResolver {
  constructor(private simtoolsService: SimtoolsService) {}

  @Mutation(() => SimulationResult)
  async simulateDelivery(
    @Args('orderId', { nullable: true }) orderId?: string,
  ) {
    return this.simtoolsService.simulateDelivery(orderId);
  }
}
