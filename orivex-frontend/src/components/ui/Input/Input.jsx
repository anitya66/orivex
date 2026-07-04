import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none transition-all",
        "placeholder:text-slate-500",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;