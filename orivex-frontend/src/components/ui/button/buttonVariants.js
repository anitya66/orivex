import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center",
    "rounded-2xl",
    "font-semibold",
    "transition-all duration-300 ease-out",
    "active:scale-[0.98]",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-blue-500/40",
    "focus-visible:ring-offset-2",
    "focus-visible:ring-offset-slate-950",
  ].join(" "),
  {
    variants: {

      variant: {

        primary:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/20 hover:-translate-y-0.5 hover:shadow-blue-500/40 hover:brightness-110",

        secondary:
          "bg-slate-800 text-white border border-slate-700 hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-0.5",

        outline:
          "border border-slate-700 bg-transparent text-white hover:bg-slate-900 hover:border-blue-500/40 hover:text-blue-300",

        destructive:
          "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5 hover:shadow-red-500/40",

      },

      size: {

        sm:
          "h-10 px-4 text-sm",

        md:
          "h-11 px-6 text-sm",

        lg:
          "h-13 px-8 text-base",

      },

    },

    defaultVariants: {

      variant: "primary",

      size: "md",

    },

  }
);