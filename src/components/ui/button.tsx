import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary rounded-md text-primary-foreground shadow",
        destructive:
          "bg-error text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-border-primary shadow-sm hover:bg-bg-disabled hover:text-text-disabled",
        active:
          "bg-brand shadow-sm text-white hover:bg-accent hover:text-accent-foreground",
        disabled: "bg-bg-disabled text-text-disable",
        activate: "bg-error text-white",
        secondary:
          "border border-border-primary text-text-secondary hover:bg-bg-disabled",
        ghost: "hover:bg-accent hover:text-accent-foreground p-0",
        link: "text-primary underline-offset-4 hover:underline",
        detect: "bg-bg-disabled rounded-lg w-full",
        NG: "bg-error-500 text-white",
        OK: "bg-brand text-white",
        pagination: "bg-bg-teriary rounded-none",
        plus: "bg-bg-primary text-text-secondary rounded-none rounded-tr-lg rounded-br-lg text-lg hover:text-white",
        minus:
          "disabled:bg-bg-disabled disabled:text-text-disable bg-bg-primary text-text-secondary rounded-none  rounded-tl-lg rounded-bl-lg text-lg hover:text-white",
        reset:
          "disabled:bg-bg-disabled disabled:text-text-disable text-[15px] bg-bg-primary text-text-secondary border-r border-l border-border-disable rounded-none hover:text-white",
        layout:
          "min-w-[116px] bg-bg-disabled border border-border-disable text-[21px] font-bold text-text-disable shadow hover:cursor-default",
        focused:
          "relative rounded-md border border-border-secondary transition-all duration-75 shadow-[0_0_0_2px] shadow-brand-500 ring-1 ring-brand-500",
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "min-w-7 h-7 rounded-lg",
        lg: "min-h-[68px] rounded-lg",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
