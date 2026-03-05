import { api } from "../api/client";
// TODO: format CNPJ and Document in the frontend, not in the backend, to avoid formatting issues when editing providers.

/* ---------- TYPES ---------- */

export type Provider = {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  company: {
    id: number;
    social_reason: string;
    fantasy_name: string;
    cnpj: string;
    state_registration: string;
    municipal_registration: string;
    cnae: string;
    port: string;
    address: string;
  };
};

export type ProviderDetails = {
  id: number;
  name: string;
  email: string;
  phone: string;
  document: string;
  birth_date: string;
  nacionality: string;
  marital_status: string;

  company: {
    id: number;
    social_reason: string;
    fantasy_name: string;
    cnpj: string;
    state_registration: string;
    municipal_registration: string;
    cnae: string;
    port: string;
    address: string;
  };

  payment_methods: {
    id: number;
    pix: string;
    bank_name: string;
    bank_code: string;
    agency: string;
    account: string;
    account_type: string;
    account_holder: string;
    document_holder: string;
  }[];

  company_documents_status: {
    documents: {
      document_type_id: number;
      name: string;
      sent: boolean;
      path: string | null;
      updated_at: string | null;
    }[];
  }[];
};

/* ---------- API ---------- */

export function getProviders() {
  return api<{ data: Provider[] }>("providers");
}

export function getProvider(id: string) {
  return api<{ data: ProviderDetails }>(`providers/${id}`);
}
