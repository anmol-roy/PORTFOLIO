interface GlowingOrbProps {
  className?: string
  color?: 'primary' | 'secondary'
}

export function GlowingOrb({ className = '', color = 'primary' }: GlowingOrbProps) {
  const colorClass = color === 'primary' ? 'bg-primary' : 'bg-secondary'

  return (
    <div
      className={`absolute rounded-full blur-[100px] opacity-20 pointer-events-none ${colorClass} ${className}`}
    />
  )
}
