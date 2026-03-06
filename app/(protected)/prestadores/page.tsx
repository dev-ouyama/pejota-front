"use client";

import { useEffect, useState } from "react";
import { getProviders, Provider } from "@/lib/providers/providers.api";
import { SkeletonTable } from "@/components/skeletons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { VisuallyHidden } from "radix-ui";

export default function PrestadoresPage() {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [page, setPage] = useState(1);
    const [meta, setMeta] = useState<any>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  setLoading(true);

  getProviders(page)
    .then((res) => {
      setProviders(res.data);
      setMeta(res.meta);
    })
    .finally(() => setLoading(false));
}, [page]);
  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="flex h-full flex-col space-y-4 justify-between">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-fit">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Empresa</TableHead>
            <TableHead>Razão Social</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>{"  "}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {providers.map((provider) => (
            <TableRow key={provider.id}>
              <TableCell className="font-medium">{provider.id}</TableCell>
              <TableCell>{provider.name}</TableCell>
              <TableCell className="font-mono">{provider.document}</TableCell>
              <TableCell>{provider.company?.fantasy_name}</TableCell>
              <TableCell>{provider.company?.social_reason}</TableCell>
              <TableCell className="font-mono">
                {provider.company?.cnpj}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/prestadores/${provider.id}`}>
                  <Button className="w-fit" variant={"ghost"}>
                    <ArrowUpRight />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {meta && (
        <div className="flex justify-end items-end select-none">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    meta.current_page > 1 && setPage(meta.current_page - 1)
                  }
                  className={
                    meta.current_page === 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>

              {/* Current */}
              <PaginationItem>
                <PaginationLink isActive>{meta.current_page}</PaginationLink>
              </PaginationItem>

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    meta.current_page < meta.last_page &&
                    setPage(meta.current_page + 1)
                  }
                  className={
                    meta.current_page === meta.last_page
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
