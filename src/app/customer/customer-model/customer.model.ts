interface Customer {
  default_contact: {
    first_name: string;
    last_name: string;
    email: string;
    phone: number | null;

  };
  address: {
    country: string;
    state: string;
  }
  id: string;
}

export interface CustomerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[]
}