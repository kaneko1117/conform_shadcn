"use client";
import { useActionState } from "react";
import { useForm } from "@conform-to/react";

import { serverActions } from "@/actions";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DATA_SCHEMA } from "@/schema";

export default function Form() {
  const [state, formAction] = useActionState(serverActions, undefined);
  const [form, fields] = useForm({
    lastResult: state,
    constraint: getZodConstraint(DATA_SCHEMA),
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: DATA_SCHEMA,
      });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={formAction}
      noValidate
      className="w-[300px] m-10"
    >
      <div>
        <Label htmlFor={fields.name.id}>Name:</Label>
        <Input
          key={fields.name.key}
          name={fields.name.name}
          defaultValue={fields.name.initialValue}
        />
        {fields.name.errors && <p className="text-red">{fields.name.errors}</p>}
      </div>
      <div>
        <Label htmlFor={fields.country.id}>country:</Label>
        <Select
          key={fields.country.key}
          name={fields.country.name}
          defaultValue={fields.country.initialValue}
          onValueChange={(value) => {
            console.log(
              form.update({
                name: fields.country.name,
                value,
              })
            );
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Choose country" />
          </SelectTrigger>
          <SelectContent>
            {["USA", "JAPAN", "China"].map((i, index) => (
              <SelectItem key={index} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {fields.country.errors && (
          <p className="text-red">{fields.country.errors}</p>
        )}
      </div>
      <Button type="submit" className="mt-5">
        Submit
      </Button>
    </form>
  );
}
