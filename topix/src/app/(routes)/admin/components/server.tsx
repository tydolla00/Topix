import { Input } from "@/shadcn/ui/input";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Textarea } from "@/shadcn/ui/textarea";
import { Dispatch, SetStateAction } from "react";
import FileUpload from "../../profile/components/uploadFile";
import { Action } from "@/app/hooks/useUploadReducer";
export const Select = ({
  label,
  value,
  items,
  setValue,
  setValid,
  register,
}: SelectProps) => {
  const name = label === "Choose a CRUD" ? "crud" : "database";
  return (
    <ShadcnSelect
      {...register(name)}
      onValueChange={(val) => {
        setValid(name, val, { shouldValidate: true });
        setValue(val);
      }}
    >
      <SelectTrigger
        onChange={(e: any) =>
          setValid(name, e.target.value, { shouldValidate: true })
        }
        className="max-w-xs"
      >
        <SelectValue placeholder={"Select an option"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items.map((item) => (
            <SelectItem key={item} className="hover:bg-blue-500" value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadcnSelect>
  );
};

export const TopixInput = ({
  register,
  errors,
  dispatch,
}: {
  register: any;
  errors: any;
  dispatch: Dispatch<Action>;
}) => (
  <>
    <label className="label-required">Createdby</label>
    <Input
      {...register("createdBy")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter username"
    />
    <p className="invalid-feedback">{errors.createdBy?.message}</p>
    <label className="label-required">Title</label>
    <Input
      {...register("title")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter title of Game"
    />
    <p className="invalid-feedback">{errors.title?.message}</p>
    <label className="label-required">TopixId</label>
    <Input
      {...register("topixId")}
      className="w-full max-w-xs"
      type="text"
      placeholder="Enter pathname"
    />
    <p className="text-sm text-slate-400">Must be unique!</p>
    <p className="invalid-feedback">{errors.topixId?.message}</p>
    <label className="label">Icon</label>
    <div className="w-full max-w-xs border-slate-800 border rounded-md cursor-pointer">
      <FileUpload dispatch={dispatch} />
    </div>
    <p className="invalid-feedback">{errors.img?.message}</p>
    <label className="label-required">Description</label>
    <Textarea
      {...register("description")}
      placeholder="Enter the description of your topix here!"
    />
    <p className="invalid-feedback">{errors.description?.message}</p>
    <p className="text-sm text-slate-400">
      This will be the description of your topix!
    </p>
  </>
);

type SelectProps = {
  label: string;
  items: string[];
  value: string | undefined;
  setValid: any;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  register: any;
};
