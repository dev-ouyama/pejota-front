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

export default function PrestadoresPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProviders()
      .then((res) => {
        setProviders(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="p-6 space-y-4">
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
    </div>
  );
}
