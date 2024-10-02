import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class SimtoolsHealth {
  @Field()
  status: string;

  @Field()
  delivery: string;
}

@ObjectType()
export class HealthCheck {
  @Field(() => SimtoolsHealth)
  simtools: SimtoolsHealth;

  @Field()
  customer: string;

  @Field()
  delivery: string;

  @Field()
  order: string;
}
