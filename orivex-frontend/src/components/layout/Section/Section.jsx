import { cn } from "@/utils/cn";

function Section({
  children,
  className,
  id,
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-24",
        className
      )}
    >
      {children}
    </section>
  );
}

export default Section;