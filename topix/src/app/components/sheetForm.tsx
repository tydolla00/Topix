"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Select, TopixInput } from "@/app/(routes)/admin/components/server";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Sheet from "./sheet";
import * as yup from "yup";
import { useMyFetch } from "../hooks/useFetch";
import { useUploadReducer } from "../hooks/useUploadReducer";
import { Toaster } from "@/shadcn/ui/toaster";
import { prisma } from "@/lib/utils";

const databases = ["game", "movie", "tv", "user", "games", "movies", "tvs"];
const crud = ["CREATE", "UPDATE", "DELETE"];
const topixClause = yup.string().when(["database", "crud"], {
  is: (db: string, crud: string) =>
    ["game", "movie", "tv"].includes(db) && crud === "CREATE",
  then: (schema) => schema.required(),
});
const homePageClause = yup.string().when(["database", "crud"], {
  is: (db: string, crud: string) =>
    ["games", "movies", "tvs"].includes(db) && crud === "CREATE",
  then: (schema) => schema.required(),
});

export const validationSchema = yup.object().shape({
  crud: yup.mixed().oneOf(crud).required(),
  database: yup.mixed().oneOf(databases).required(),
  // game/movie/tv DB
  createdBy: topixClause.default("tydolla00"),
  title: topixClause,
  img: yup.mixed().notRequired(),
  description: topixClause || homePageClause,
  topixId: topixClause,
  //   games/movies/tvs
  path: homePageClause,
});

export default function SheetForm() {
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const [crudOperations, setCrudOperations] = useState<string>();
  const [databaseOperations, setDatabaseOperations] = useState<string>();
  const [open, setOpen] = useState<boolean>(false);

  const { state: reducer, dispatch, startUpload } = useUploadReducer();

  useEffect(() => {
    if (!open) {
      setCrudOperations(undefined);
      setDatabaseOperations(undefined);
      reset();
    }
  }, [open]);

  const { state, fetchData } = useMyFetch({
    url: "http://localhost:3000/api/topix",
    method: "POST",
  });

  const onSubmit = async (data: any) => {
    console.log({ reducer });
    if (reducer.file != null) {
      console.log("got here");
      const res = await startUpload(reducer.file);
      const createData = {
        ...data,
        fileKey: res && res[0].key,
        link: res && res[0].url,
      };
      console.log({ createData });
      console.log(res);
      const update = await fetchData(createData);
      console.log(update);
      // const update = await prisma.game.create({
      //   data: {
      //     createdBy: data.createdBy,
      //     title: data.title,
      //     topixId: data.topixId,
      //     description: data.description,
      //     img: {
      //       create: {
      //         fileKey: res && res[0].key,
      //         link: (res && res[0].url) as string,
      //       },
      //     },
      //   },
      // });
      //   if res set file key and img. Maybe make image table and store info there.
    }
    // then submit form with axios to api.
    console.log({ data });
  };

  //   console.log({ errors });
  //   console.log(getValues());

  return (
    <Sheet
      open={open}
      setOpen={setOpen}
      title="Modify Database"
      description="Make changes to database here. Save when done."
      reset={reset}
    >
      <div>
        <Toaster />
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="label">CRUD Operation</label>
          <Select
            value={crudOperations}
            register={register}
            label="Choose a CRUD"
            items={crud}
            setValid={setValue}
            setValue={setCrudOperations}
          />
          <label className="label">Database</label>
          <Select
            value={databaseOperations}
            register={register}
            label="Choose a Database"
            items={databases}
            setValid={setValue}
            setValue={setDatabaseOperations}
          />
          {crudOperations === "CREATE" &&
            ["game", "tv", "movie"].includes(String(databaseOperations)) && (
              <TopixInput
                dispatch={dispatch}
                errors={errors}
                register={register}
              />
            )}
          {crudOperations === "CREATE" &&
            ["games", "tvs", "movies"].includes(String(databaseOperations)) && (
              <div>Gamse/Tvs/Movies</div>
            )}
          <button type="submit">submit</button>
        </form>
      </div>
    </Sheet>
  );
}
