import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class OrderService {
  constructor(
    @Inject('SUPABASE_CLIENT') private supabaseClient: SupabaseClient,
  ) {}

  async getOrders() {
    const { data, error } = await this.supabaseClient
      .from('orders')
      .select('*, order_items(*)');
    if (error) throw error;
    return data;
  }

  async getOrder(id: string) {
    const { data, error } = await this.supabaseClient
      .from('orders')
      .select('*, order_items(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data;
  }
}
