import { Resolver, Query } from '@nestjs/graphql';
import { Customer } from './customer.model';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { SERVICE_EVENTS } from 'libs/shared/service.events';

@Resolver((of) => Customer)
export class CustomersResolver {
  constructor(@Inject('CUSTOMER') private customerService: ClientProxy) {}

  @Query((returns) => [Customer])
  async customers(): Promise<Customer[]> {
    const customers = await lastValueFrom(
      this.customerService.send(
        { cmd: SERVICE_EVENTS.CUSTOMER.GET_CUSTOMERS },
        {},
      ),
    );
    return customers;
  }
}
