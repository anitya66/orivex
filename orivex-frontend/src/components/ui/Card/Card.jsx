import { cn } from "@/utils/cn";

function Card({ children, className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-900 shadow-lg",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;