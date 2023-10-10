import { Button } from "@/shadcn/ui/button";
import {
  Sheet as ShadcnSheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shadcn/ui/sheet";
import { Dispatch, SetStateAction } from "react";

export default function Sheet({
  title,
  triggerText,
  description,
  children,
  reset,
  open,
  setOpen,
}: SheetProps) {
  return (
    <ShadcnSheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button type="button" variant={"outline"}>
          {triggerText}
        </Button>
      </SheetTrigger>
      <SheetContent id="sheet" className="overflow-y-scroll max-h-screen">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button className="mt-3" type="submit">
              Close
            </Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </ShadcnSheet>
  );
}

type SheetProps = {
  title: string;
  triggerText: string;
  description: string;
  children: React.ReactNode;
  reset(): void;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};
