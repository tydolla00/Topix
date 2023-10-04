export const ErrorMessage = ({
  errors,
  name,
}: {
  errors: any;
  name: string;
}) => <p className="invalid-feedback">{errors[name]?.message || ""}</p>;
