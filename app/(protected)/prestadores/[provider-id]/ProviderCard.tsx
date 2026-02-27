import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";

import { Controller, useForm } from "react-hook-form";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const provider = {
  name: "Pedro Pejota",
  email: "pejota@prestador.com",
  phone: "41999938461",
  document: "08896118905",
  birth_date: "17/02/1993",
  nacionality: "Brasileira",
  marital_status: "Solteiro",
};

export function ProviderCard() {
  return (
    <div className="">
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>{provider.name}</CardTitle>
          <CardDescription>Dados do Prestador</CardDescription>
          <CardAction>
            <Button variant="outline">Editar</Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form>
            <FieldGroup>
              <Controller
                name="name"
                control={control}
                defaultValue={provider.name}
              >
                <Field>
                  <FieldLabel>Nome</FieldLabel>
                </Field>
                <Input value={provider.name}></Input>
              </Controller>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
