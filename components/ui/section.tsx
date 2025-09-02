import * as React from "react"
import { cn } from "@/utils/cn"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
  className?: string
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-24 lg:py-32",
          className
        )}
        {...props}
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {children}
        </div>
      </section>
    )
  }
)
Section.displayName = "Section"

const SectionHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn("mb-16 space-y-4", className)} 
    {...props} 
  />
))
SectionHeader.displayName = "SectionHeader"

const SectionTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-3xl font-semibold tracking-tight text-foreground",
      className
    )}
    {...props}
  />
))
SectionTitle.displayName = "SectionTitle"

const SectionDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-lg text-muted leading-relaxed max-w-content",
      className
    )}
    {...props}
  />
))
SectionDescription.displayName = "SectionDescription"

export { Section, SectionHeader, SectionTitle, SectionDescription }