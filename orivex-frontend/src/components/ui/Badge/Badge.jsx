import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white",
        success: "bg-green-600 text-white",
        warning: "bg-yellow-500 text-black",
        danger: "bg-red-600 text-white",
        outline: "border border-slate-700 text-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  children,
  variant,
  className,
}) {
  return (
    <span
      className={cn(
        badgeVariants({ variant }),
        className
      )}
    >
      {children}
    </span>
  );
}

export default Badge;