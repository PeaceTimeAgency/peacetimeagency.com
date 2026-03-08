import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, container = true, ...props }, ref) => {
    return (
      <section ref={ref} className={cn("py-12 md:py-16 lg:py-24", className)} {...props}>
        {container ? (
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            {props.children}
          </div>
        ) : (
          props.children
        )}
      </section>
    );
  }
);
Section.displayName = "Section";
