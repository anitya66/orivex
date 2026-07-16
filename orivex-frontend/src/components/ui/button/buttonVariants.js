import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-600 text-white hover:bg-blue-700",

        secondary:
          "bg-slate-800 text-white hover:bg-slate-700",

        outline:
          "border border-slate-700 bg-transparent hover:bg-slate-800",

        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },

      size: {
        sm: "h-9 px-3",

        md: "h-11 px-5",

        lg: "h-12 px-7",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);