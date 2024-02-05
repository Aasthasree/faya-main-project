export interface Customer {
  default_contact: {
    first_name: string;
    last_name: string;
    email: string;

  };
  default_billing: {
    company_name: string | null;
  }

  credit_term: {
    name: string;
  }

  store:{
    name: string
  }
  id: string;
}

export interface CustomerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[]
}