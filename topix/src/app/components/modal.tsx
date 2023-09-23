"use client";

import * as React from "react";
import ClientOnly from "./clientOnly";

interface CustomDialogProps extends React.HTMLAttributes<HTMLDialogElement> {
  children: React.ReactNode;
  height?: string;
}
// ? Directly under <Modal>, must use wrap entire block with <form> Don't know how accurate this is..
// ? Modal currently is rendered only on client due to hyrdration errors.
const Modal: React.FC<CustomDialogProps> = ({
  children,
  height,
  ...props
}: {
  children: React.ReactNode;
  height?: string;
  props?: HTMLDivElement;
}) => (
  <ClientOnly>
    <dialog {...props} className="modal">
      <div className={`modal-box ${height}`}>
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        {children}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  </ClientOnly>
);
export default Modal;
