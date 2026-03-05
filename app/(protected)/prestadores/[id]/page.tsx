"use client";

import { useEffect, useState } from "react";
import { getProvider, ProviderDetails } from "@/lib/providers/providers.api";
import { useParams } from "next/navigation";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";

export default function Page() {
  const params = useParams();
  const id = params.id as string;

  const [provider, setProvider] = useState<ProviderDetails | null>(null);

  useEffect(() => {
    getProvider(id).then((res) => setProvider(res.data));
  }, [id]);

  if (!provider) {
    return <div className="p-8">Carregando...</div>;
  }

  const company = provider.company;
  const payments = provider.payment_methods;
  const documents = provider.company_documents_status[0]?.documents || [];

  return (
    <div className="p-8 flex flex-col gap-4">
      {/* Provider */}

      <div className="grid grid-cols-2 gap-4 w-full">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Prestador</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <b>Nome:</b> {provider.name}
            </div>
            <div>
              <b>Email:</b> {provider.email}
            </div>
            <div>
              <b>Telefone:</b> {provider.phone}
            </div>
            <div>
              <b>CPF:</b> {provider.document}
            </div>
            <div>
              <b>Nascimento:</b> {provider.birth_date}
            </div>
            <div>
              <b>Nacionalidade:</b> {provider.nacionality}
            </div>
            <div>
              <b>Estado Civil:</b> {provider.marital_status}
            </div>
          </CardContent>
        </Card>

        {/* Company */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Empresa</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <b>Razão Social:</b> {company.social_reason}
            </div>
            <div>
              <b>Nome Fantasia:</b> {company.fantasy_name}
            </div>
            <div>
              <b>CNPJ:</b> {company.cnpj}
            </div>
            <div>
              <b>CNAE:</b> {company.cnae}
            </div>
            <div>
              <b>Porte:</b> {company.port}
            </div>
            <div>
              <b>Inscrição Estadual:</b> {company.state_registration}
            </div>
            <div>
              <b>Inscrição Municipal:</b> {company.municipal_registration}
            </div>
            <div>
              <b>Endereço:</b> {company.address}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pagamento</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Banco</TableHead>
                <TableHead>Agência</TableHead>
                <TableHead>Conta</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>PIX</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>{p.bank_name}</TableCell>
                  <TableCell>{p.agency}</TableCell>
                  <TableCell>{p.account}</TableCell>
                  <TableCell>{p.account_type}</TableCell>
                  <TableCell>{p.pix}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card>
        <CardHeader>
          <CardTitle>Documentos</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Documento</TableHead>
                <TableHead>Enviado</TableHead>
                <TableHead>Atualizado</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.document_type_id}>
                  <TableCell>{doc.name}</TableCell>
                  <TableCell>{doc.sent ? "Sim" : "Não"}</TableCell>
                  <TableCell>{doc.updated_at ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
