import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}