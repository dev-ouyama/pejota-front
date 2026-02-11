/* This lib handles the navigation items for the application based on the user's permissions */
/* 
NAVIGATION array of NavItem objects will be fed to app-sidebar.tsx, dynamically defining the sidebar items
so that the user can only see the items they have permission to access.
*/
/* BACKEND: refactor user permissions schema */

import type { ComponentType } from "react";
import { Permission } from "@/lib/auth/permissions";
import {
  Home,
  Building,
  Users,
  DollarSign,
  Settings,
  PlusSquare,
} from "lucide-react";

export type NavItem = {
  label: string;
  href?: string;
  permission?: Permission | Permission[];
  children?: NavItem[];
  icon?: ComponentType<{ className?: string }>;
};

export const NAVIGATION: NavItem[] = [
  // Single entry (no group)
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },

  {
    label: "Prestadores",
    href: "/prestadores",
    permission: "ver prestadores",
    icon: Users,
  },
  {
    label: "Novo Prestador",
    href: "/prestadores/novo",
    permission: "criar prestador",
    icon: PlusSquare,
  },

  // Empresas as a single entry
  {
    label: "Empresas",
    href: "/empresas",
    permission: "ver empresas",
    icon: Building,
  },

  // Pagamentos group (collapsable)
  {
    label: "Pagamentos",
    icon: DollarSign,
    children: [
      {
        label: "Ordens",
        href: "/pagamentos/ordens",
        permission: "ver pagamentos",
      },
      {
        label: "Status",
        href: "/pagamentos/status",
        permission: "ver status pagamento",
      },
      {
        label: "Formas",
        href: "/pagamentos/formas",
        permission: "ver tipos pagamento",
      },
    ],
  },

  // Opções group (collapsable)
  {
    label: "Opções",
    icon: Settings,
    children: [
      {
        label: "Usuários",
        href: "/opcoes/usuarios",
        permission: "ver usuarios",
      },
      { label: "Perfis", href: "/opcoes/perfis", permission: "ver perfis" },
      {
        label: "Centros de custo",
        href: "/opcoes/centros-de-custo",
        permission: "ver centros de custo",
      },
      {
        label: "Tomadores",
        href: "/opcoes/tomadores",
        permission: "ver tomadores",
      },
    ],
  },
];
