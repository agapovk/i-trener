import { cn } from "@shared/lib"

interface ProseProps {
  children: React.ReactNode
  className?: string
}

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "text-secondary leading-relaxed",
        "[&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:font-extrabold [&_h2]:text-2xl [&_h2]:text-primary",
        "[&_h3]:mt-6 [&_h3]:mb-3 [&_h3]:font-bold [&_h3]:text-primary [&_h3]:text-xl",
        "[&_p]:mb-4",
        "[&_ul]:mb-4 [&_ul]:ml-6 [&_ul]:list-disc",
        "[&_ol]:mb-4 [&_ol]:ml-6 [&_ol]:list-decimal",
        "[&_li]:mb-1",
        "[&_strong]:font-semibold [&_strong]:text-primary",
        "[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-2",
        className,
      )}
    >
      {children}
    </div>
  )
}
