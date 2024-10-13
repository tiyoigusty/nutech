export type UserEntity = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  balance: number;
  profile_image: string;
};

export type ServiceEntity = {
  id: string;
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tarif: number;
};

export type TransactionEntity = {
  invoice_number: string;
  amount: number;
  transaction_type: string;
  description: string;
  created_at: string;
};
