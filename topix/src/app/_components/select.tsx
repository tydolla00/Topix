import {
  Select as ShadcnSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Dispatch, SetStateAction } from "react";

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

type SelectProps = {
  label: string;
  items: string[];
  value: string | undefined;
  setValid: any;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  register: any;
};
