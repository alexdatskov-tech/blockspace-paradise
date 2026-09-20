import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold cursor-pointer transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--elev-1)] hover:bg-[color-mix(in_oklab,var(--primary)_88%,white)]",
        // Primary call to action: solid, with a restrained tinted shadow.
        hero: "bg-primary text-primary-foreground shadow-[0_6px_20px_color-mix(in_oklab,var(--primary)_22%,transparent)] hover:bg-[color-mix(in_oklab,var(--primary)_88%,white)] hover:shadow-[0_10px_28px_color-mix(in_oklab,var(--primary)_28%,transparent)]",
        // High-emphasis alternative: dark fill, accent text, hairline border.
        extreme:
          "bg-[oklch(0.16_0.016_168_/_88%)] text-primary border border-[color-mix(in_oklab,var(--primary)_40%,transparent)] backdrop-blur-xl shadow-[var(--elev-1)] hover:border-[color-mix(in_oklab,var(--primary)_70%,transparent)] hover:bg-[oklch(0.19_0.02_168_/_92%)]",
        glass:
          "border border-border bg-glass text-foreground backdrop-blur-xl hover:border-[var(--border-strong)] hover:bg-[oklch(0.22_0.016_168_/_65%)]",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-[var(--border-strong)] bg-[oklch(0.18_0.014_168_/_45%)] backdrop-blur-xl text-foreground hover:bg-[oklch(0.22_0.016_168_/_60%)]",
        secondary: "bg-secondary text-secondary-foreground backdrop-blur-md hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
        icon: "h-9 w-9",
        xl: "h-11 rounded-lg px-5 text-sm",
        extreme: "h-12 sm:h-[3.25rem] rounded-lg px-7 text-sm sm:text-[0.9375rem]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
