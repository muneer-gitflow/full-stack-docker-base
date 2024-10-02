import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Order {
  @Field(() => ID)
  id: string;

  @Field()
  customerId: string;

  @Field()
  status: string;

  @Field(() => String, { nullable: true })
  createdAt?: string;

  @Field(() => String, { nullable: true })
  updatedAt?: string;

  @Field(() => [OrderItem])
  items: OrderItem[];

  @Field(() => String, { nullable: true })
  eta?: string;

  @Field(() => String, { nullable: true })
  deliveryAddress?: string;
}

@ObjectType()
export class OrderItem {
  @Field()
  id: string;

  @Field()
  name: string;
}
