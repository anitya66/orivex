import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          [
            "flex h-12 w-full",
            "rounded-2xl",
            "border border-slate-700",
            "bg-slate-900/80",
            "px-4",
            "text-sm text-white",
            "placeholder:text-slate-500",
            "transition-all duration-300 ease-out",

            "hover:border-slate-600",

            "focus:outline-none",
            "focus:border-blue-500",
            "focus:ring-4",
            "focus:ring-blue-500/15",

            "disabled:pointer-events-none",
            "disabled:opacity-50",

            "shadow-sm",

            "autofill:bg-slate-900",
          ].join(" "),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;