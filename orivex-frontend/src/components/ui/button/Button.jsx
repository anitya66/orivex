import { buttonVariants } from "./buttonVariants";
import { cn } from "@/utils/cn";

function Button({
  children,
  variant,
  size,
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        buttonVariants({
          variant,
          size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;