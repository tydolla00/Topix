"use client";
import Ty from "@/app/assets/ty.png";
import { Toaster } from "@/shadcn/ui/toaster";
import Image from "next/image";
import { ContactForm } from "./_components/client";

export default function Contact() {
  return (
    <>
      <div className="max-w-[80vw] my-0 mx-auto hero">
        <Toaster />
        <div className="hero-content flex-col md:flex-row">
          <div className="text-2xl uppercase mx-2 text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-rose-500 my-4 flex-1">
            Please fill out this form to suggest any changes, report bugs, or
            tell me about your experience!
            <Image
              //   height={200}
              alt="Ty"
              className="md:max-h-none mx-auto max-h-48"
              src={Ty}
            />
          </div>
          <ContactForm />
        </div>
      </div>
    </>
  );
}
