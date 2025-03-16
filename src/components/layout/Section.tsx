import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
export default function Section(
  props: PropsWithChildren<{ className?: string }>
) {
  return (
    <section
      className={cn(
        "w-full m-auto px-4 py-20 lg:py-28 max-w-6xl flex max-lg:flex-col",
        props.className
      )}
    >
      {props.children}
    </section>
  );
}
