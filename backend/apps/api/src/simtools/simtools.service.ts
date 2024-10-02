import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SimulationResult } from './simtools.types';
import { lastValueFrom } from 'rxjs';
import { SERVICE_NAMES } from 'libs/shared/service.names';
import { SERVICE_EVENTS } from 'libs/shared/service.events';

@Injectable()
export class SimtoolsService {
  constructor(
    @Inject(SERVICE_NAMES.SIMTOOLS) private simtoolsClient: ClientProxy,
  ) {}

  async simulateDelivery(orderId?: string): Promise<SimulationResult> {
    try {
      const result = await lastValueFrom(
        this.simtoolsClient.send(
          { cmd: SERVICE_EVENTS.SIMTOOLS.SIMULATE_DELIVERY },
          { orderId },
        ),
      );
      return { message: result.message };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
