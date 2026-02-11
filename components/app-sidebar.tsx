"use client";

import * as React from "react";
import {
  User,
  Users,
  PlusSquare,
  CircleGauge,
  ChevronRight,
  Receipt,
  CircleDollarSign,
  LandPlot,
  Command,
  Sailboat,
  PersonStanding,
  Shield,
  UserCog,
} from "lucide-react";

import { useAuth } from "@/lib/auth/auth-context";

import { TakerSwitcher } from "@/components/taker-switcher";
import { NavUser } from "@/components/nav-user";
// import { TeamSwitcher } from "@/components/team-switcher";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

/**
 * AppSidebar - renders dynamic sidebar based on user permissions.
 * - Only checks singular "ver ..." permissions per your request.
 * - Prestadores entry -> Users icon, action for "Novo prestador".
 * - Pagamentos -> collapsible with three mock entries.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { can } = useAuth();

  // avoid using client-only auth during SSR:
  // render full menu on server, then filter after client mount to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const showPrestadores = mounted ? can("ver prestador") : true;
  const showPagamentos = mounted ? can("ver pagamentos") : true;

  // sample user block kept for footer
  const userSample = {
    name: "Admin",
    email: "teste@example.com",
    avatar: { User },
  };

  const takers = [
    {
      name: "Humana Soluções",
      logo: PersonStanding,
      plan: "Ltda.",
    },
    {
      name: "Navia Tech",
      logo: Sailboat,
      plan: "Sociedade Simples",
    },
    {
      name: "Serviços Gerais",
      logo: Command,
      plan: "EPP",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TakerSwitcher takers={takers} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Plataforma</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/dashboard">
                  <CircleGauge />
                  <span>Dashboard</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            {showPrestadores && (
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/prestadores">
                    <Users />
                    <span>Prestadores</span>
                  </a>
                </SidebarMenuButton>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuAction asChild>
                      <a href="/prestadores/novo" aria-label="Novo prestador">
                        <PlusSquare />
                      </a>
                    </SidebarMenuAction>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Novo prestador</p>
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            )}

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/notas-fiscais">
                  <Receipt />
                  <span>Notas fiscais</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/centros-de-custo">
                  <LandPlot />
                  <span>Centros de Custo</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          {showPagamentos && (
            <Collapsible asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Pagamentos">
                    <CircleDollarSign />
                    <span>Pagamentos</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/pagamentos/ordens">
                          <span>Ordens</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/pagamentos/status">
                          <span>Status</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>

                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton asChild>
                        <a href="/pagamentos/formas">
                          <span>Tipos</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )}
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Configurações</SidebarGroupLabel>

          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/usuarios">
                  <UserCog />
                  <span>Usuários</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/centros-de-custo">
                  <Shield />
                  <span>Perfis</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* keep other groups/options here if needed later */}
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={userSample} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
