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
  type,
  autoFocus,
  ...props
}: InputProps<T>) {
  const { field, fieldState } = useController<T>(props);

  return (
    <div>
      <input
        className={className}
        type={type}
        placeholder={props.name}
        autoFocus={autoFocus}
        {...field}
      />

      <FormControlError fieldState={fieldState} />
    </div>
  );
}

export default Input;
