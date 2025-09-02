import * as React from "react"
import { cn } from "@/utils/cn"

const buttonVariants = {
  variant: {
    default: "bg-foreground text-background hover:opacity-80",
    secondary: "bg-transparent border border-muted text-accent hover:border-accent",
    ghost: "hover:bg-surface text-muted hover:text-foreground",
  },
  size: {
    default: "h-10 px-6 py-2",
    sm: "h-8 px-4 py-1.5 text-sm",
    lg: "h-12 px-8 py-3",
  }
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants.variant
  size?: keyof typeof buttonVariants.size
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          buttonVariants.variant[variant],
          buttonVariants.size[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }