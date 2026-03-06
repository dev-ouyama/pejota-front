import { api } from "../api/client";

/* ---------- BASE TYPES ---------- */

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

/* ---------- PAGINATION TYPES ---------- */

export type PaginationLinks = {
  first: string | null;
  last: string | null;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;

  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
};

export type PaginatedProviders = {
  data: Provider[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

/* ---------- DETAILS ---------- */

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

export function getProviders(page = 1) {
  return api<PaginatedProviders>(`providers?page=${page}`);
}

export function getProvider(id: string) {
  return api<{ data: ProviderDetails }>(`providers/${id}`);
}
