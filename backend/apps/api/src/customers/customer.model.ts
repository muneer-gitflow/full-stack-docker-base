import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Customer {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}