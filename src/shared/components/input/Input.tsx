import {
  FieldValues,
  UseControllerProps,
  useController,
} from "react-hook-form";
import FormControlError from "../form-control-error/FormControlError";

type InputProps<T extends FieldValues> =
  React.ComponentPropsWithoutRef<"input"> & UseControllerProps<T>;

function Input<T extends FieldValues>({
  className,
  autoFocus,
  control,
  rules,
  name,
  ...props
}: InputProps<T>) {
  const { field, fieldState } = useController<T>({ name, control, rules });

  return (
    <div>
      <input
        name={name}
        className={className}
        autoFocus={autoFocus}
        {...props}
        {...field}
      />

      <FormControlError fieldState={fieldState} />
    </div>
  );
}

export default Input;
