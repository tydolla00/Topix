"use client";

export const SaveChangesButton = ({
  isDirty,
  dirtyFields,
  isValid,
  reset,
}: SaveChangesProps) => (
  <button
    disabled={
      (isDirty && Object.keys(dirtyFields).length === 0) ||
      (!isDirty && !isValid)
    }
    onClick={() => {
      setTimeout(() => {
        reset();
      }, 3000);
    }}
    type="submit"
    className="btn btn-secondary ml-auto block"
  >
    Save Changes
  </button>
);

export const UploadProfileButton = ({ oneday }: { oneday: boolean }) => (
  <button
    disabled={oneday}
    onClick={() => {
      let modal: any = window;
      modal.upload.showModal();
    }}
    type="button"
    className="btn btn-ghost btn-outline"
  >
    Update Profile Pic
  </button>
);

type SaveChangesProps = {
  isDirty: boolean;
  dirtyFields: Partial<
    Readonly<{
      email?: boolean | undefined;
      birthday?: boolean | undefined;
      pronouns?: boolean | {} | undefined;
      username?: boolean | undefined;
      name?: boolean | undefined;
    }>
  >;
  isValid: boolean;
  reset: any;
};
