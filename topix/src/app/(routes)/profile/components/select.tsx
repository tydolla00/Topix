import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { $Enums } from "@prisma/client";
export function PronounSelect({
  register,
  disabled,
  defaultValue,
  setValue,
}: {
  register: any;
  disabled: boolean;
  defaultValue?: $Enums.Pronouns | null;
  setValue: any;
}) {
  return (
    <Select disabled={disabled} required {...register("pronouns")}>
      <SelectTrigger className="max-w-xs">
        <SelectValue
          onChange={(e: any) =>
            setValue("select", e.target.value, { shouldValidate: true })
          }
          defaultValue={defaultValue?.toString()}
          placeholder={defaultValue ? defaultValue : `Choose your pronoun"`}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select a pronoun</SelectLabel>
          <SelectItem value="He/Him">He/Him</SelectItem>
          <SelectItem value="She/Her">She/Her</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
