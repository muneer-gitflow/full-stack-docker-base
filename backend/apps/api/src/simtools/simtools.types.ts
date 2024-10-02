import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SimulationResult {
  @Field()
  message: string;
}