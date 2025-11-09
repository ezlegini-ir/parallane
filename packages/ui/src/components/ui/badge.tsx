import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@parallane/ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-3 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground  hover:bg-primary/80",
        green:
          "border-[1px] border-green-500/50 bg-green-500/20 text-green-500 hover:bg-green-500/30",
        red: "border-[1px] border-red-500/50 bg-red-500/20 text-red-500 hover:bg-red-500/30",
        blue: "border-[1px] border-blue-500/50 bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
        gray: "border-[1px] border-slate-500/50 bg-slate-500/20 text-gray-300 hover:bg-gray-500/30",
        violet:
          "border-[1px] border-violet-500/50 bg-violet-500/20 text-violet-300 hover:bg-violet-500/30",
        orange:
          "border-[1px] border-orange-500/50 bg-orange-500/20 text-orange-500 hover:bg-orange-500/30",

        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground  hover:bg-destructive/80",
        outline: "text-foreground",
        primary:
          "border-transparent bg-primary/10 text-secondary-foreground hover:bg-primary/100 hover:text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
