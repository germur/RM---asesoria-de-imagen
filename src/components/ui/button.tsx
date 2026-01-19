import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Default: NEGRO (Autoridad). Se usa para acciones generales.
        default: "bg-brand-black text-brand-white hover:bg-stone-800 shadow-sm transition-all duration-300 rounded-sm",

        // Primary Brand: ROJO (Conversión). ÚNICO por pantalla (El "Call to Action").
        brand: "bg-brand-primary text-brand-white hover:bg-brand-secondary shadow-md hover:shadow-lg transition-all duration-300 font-bold tracking-widest uppercase rounded-sm",

        // Outline: Borde negro fino.
        outline: "border border-brand-black bg-transparent hover:bg-brand-black hover:text-white transition-colors rounded-sm uppercase tracking-widest",

        // Ghost: Para menús.
        ghost: "hover:bg-brand-gray text-brand-black",
        // Destructive
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-8 py-3",
        sm: "h-10 px-4",
        lg: "h-16 px-10 text-lg", // Botones grandes para zona táctil móvil
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
