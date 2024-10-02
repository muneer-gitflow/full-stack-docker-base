export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface OrderStatus {
  orderId: string;
  status: string;
}
