interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 mb-6 ${className}`}>
      <span className="h-px w-8 bg-primary/50"></span>
      <span className="font-heading text-sm tracking-widest uppercase text-primary/80">
        {children}
      </span>
    </div>
  )
}
