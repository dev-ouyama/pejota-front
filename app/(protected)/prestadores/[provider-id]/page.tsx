import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProviderCard } from "./ProviderCard";

const provider = {
  id: 1,
  name: "Pedro Pejota",
  email: "pejota@prestador.com",
  phone: "41999938461",
  document: "08896118905",
  birth_date: "17/02/1993",
  nacionality: "Brasileira",
  marital_status: "Solteiro",
  company: [
    {
      id: 1,
      social_reason: "Pejota Tecnologia LTDA",
      fantasy_name: "Pejota Tech",
      cnpj: "35010117000130",
      state_registration: "123456789",
      municipal_registration: "987654321",
      cnae: "6201500",
      port: "ME",
      address: "Rua Exemplo, 123 - Curitiba/PR",
    },
  ],
  payment_methods: [
    {
      id: 1,
      provider_id: 1,
      pix: "pejota@pix.com",
      bank_name: "Nubank",
      bank_code: "260",
      agency: "0001",
      account: "123456-7",
      account_type: "CC",
      account_holder: "Pedro Pejota",
      document_holder: "08896118905",
    },
  ],
};

export default function Page() {
  return (
    <div className="p-8 relative flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold">{provider.name}</h1>
        <h2 className="">
          {provider.company[0].social_reason} - {provider.company[0].cnpj}
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2">
          <ProviderCard />
        </div>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Dados do Prestador</CardTitle>
            <CardDescription>Card Description</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
