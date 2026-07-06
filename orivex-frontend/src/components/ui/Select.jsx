import { cn } from "@/utils/cn";

function Select({
  className,
  children,
  ...props
}) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none transition-all",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20",
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
}

export default Select;