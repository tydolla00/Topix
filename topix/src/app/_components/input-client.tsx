"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { useFieldArray } from "react-hook-form";
import { ErrorMessage } from "./message";
import { Input } from "@/shadcn/ui/input";

export const TopixFields = ({
  control,
  getValues,
  register,
  errors,
}: {
  control: any;
  getValues: any;
  register: any;
  errors: any;
}) => {
  const { append, remove, fields } = useFieldArray({
    name: "topix",
    control,
    rules: {
      minLength: 16,
      maxLength: 64,
      required: "Please add at least 16 topix.",
    },
  });

  return (
    <>
      <h2 className="text-xl font-bold">{`${fields.length} items added!`}</h2>
      <div className="flex justify-between">
        <label className="label">Name</label>
        <label className="label">Topix</label>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex justify-between">
          <div>
            <Input
              className="max-w-[135px]"
              {...register(`topix.${index}.name`)}
              type="text"
            />
            <ErrorMessage errors={errors} name={`topix.${index}.name`} />
          </div>
          <div>
            <div className="flex">
              <Input
                className="max-w-[135px]"
                {...register(`topix.${index}.type`)}
                type="text"
              />
              <Trash2
                onClick={() => remove(index)}
                className="cursor-pointer mt-2"
                size={20}
                color="#b51a00"
              />
            </div>
            <ErrorMessage errors={errors} name={`topix.${index}].type`} />
            <ErrorMessage errors={errors} name="topix.root" />
          </div>
        </div>
      ))}
      <p className="text-slate-500 text-sm">
        Enter the name and an image/link for each entry
      </p>
      <Button
        variant={"outline"}
        className="block my-2"
        onClick={() => {
          append({
            name: "",
            type: "",
          });
        }}
        type="button"
      >
        Add Topix
      </Button>
    </>
  );
};
