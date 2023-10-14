"use client";

import Sheet from "@/app/_components/sheet";
import { validationSchema } from "@/app/_components/sheetForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TopixInput } from "./input";
import { useUploadReducer } from "@/app/hooks/useUploadReducer";
import { Button } from "@/shadcn/ui/button";
import { useSession } from "next-auth/react";

export default async function TopixForm({
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
  const { data: session } = useSession();

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
      description={`Create your own game to decide a winner among related topics. Games are played in a bracket style. 
      Topix are in a name and link format.
      Ex: Title - Best Foods. Item One: Hershey Bar - {link}`}
    >
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TopixInput
            user={session?.user?.email}
            control={control}
            getValues={getValues}
            setValue={setValue}
            register={register}
            errors={errors}
            dispatch={dispatch}
          />
          {session?.user?.email && (
            <Button className="mt-3 block ml-auto">Submit</Button>
          )}
        </form>
      </div>
    </Sheet>
  );
}
