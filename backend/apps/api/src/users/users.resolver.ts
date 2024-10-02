import { Resolver, Query } from '@nestjs/graphql';
import { User } from './user.model';

@Resolver(of => User)
export class UsersResolver {
  @Query(returns => [User])
  async users(): Promise<User[]> {
    // Hardcoded users for now
    return [
      { id: '1', name: 'John Doe', email: 'john@example.com' },
      { id: '2', name: 'Jane Doe', email: 'jane@example.com' },
    ];
  }
}