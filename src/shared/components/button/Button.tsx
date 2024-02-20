import classes from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button className={`${classes["button"]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
