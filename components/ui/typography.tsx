import { cn } from "@/utils/cn"

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function TypographyH1({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn(
        "text-4xl font-semibold tracking-tight text-foreground font-display",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  )
}

export function TypographyH2({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}

export function TypographyH3({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}

export function TypographyBody({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-base leading-relaxed text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function TypographyMuted({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

export function TypographySmall({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLElement>) {
  return (
    <small
      className={cn(
        "text-sm font-medium leading-none text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </small>
  )
}

export function TypographyLead({ children, className, ...props }: TypographyProps & React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xl text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}