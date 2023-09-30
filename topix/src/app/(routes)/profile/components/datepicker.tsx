"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";

export function DatePicker({
  disabled,
  birthday,
  setBirthday,
  register,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant={"default"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !birthday && "text-muted-foreground",
            disabled && "cursor-not-allowed"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {birthday ? format(birthday, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          {...register("birthday")}
          mode="single"
          selected={birthday}
          onSelect={setBirthday}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

type DatePickerProps = {
  disabled: boolean;
  birthday: Date | undefined;
  setBirthday: React.Dispatch<React.SetStateAction<Date | undefined>>;
  register: any;
};
