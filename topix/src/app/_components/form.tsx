"use client";

import Sheet from "@/app/_components/sheet";
import { validationSchema } from "@/app/_components/sheetForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TopixInput } from "./input";
import { useUploadReducer } from "@/app/hooks/useUploadReducer";
import { Button } from "@/shadcn/ui/button";

export default function TopixForm({
  sheetTitle,
  database,
}: {
  sheetTitle: string;
  database: string;
}) {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });
  const { dispatch } = useUploadReducer();

  useEffect(() => {
    setValue("crud", "CREATE");
    setValue("database", database);
    return () => {
      reset();
    };
  }, []);

  const onSubmit = () => {
    console.log("Do nothing!");
  };

  return (
    <Sheet
      reset={reset}
      triggerText="Create +"
      title={sheetTitle}
      description="Fill out the fields and start adding topix to create a game for you and others around the world to play!"
    >
      <div>
        <form key={"Movies Form"} onSubmit={handleSubmit(onSubmit)}>
          <TopixInput
            control={control}
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
            dispatch={dispatch}
          />
          <Button className="mt-3 block ml-auto">Submit</Button>
        </form>
      </div>
    </Sheet>
  );
}
