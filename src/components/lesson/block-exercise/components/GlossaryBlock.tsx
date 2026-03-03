import { useDraggable } from '@dnd-kit/react'

interface GlossaryBlockProps {
  block: string
  isUsed: boolean
  onAdd: () => void
  disabled: boolean
}

export default function GlossaryBlock({ block, isUsed, onAdd, disabled }: GlossaryBlockProps) {
  const { ref } = useDraggable({
    id: `avail-${block}`,
    disabled: isUsed || disabled,
  })

  if (isUsed) {
    return (
      <div className="px-4 py-2 rounded-lg font-mono text-sm bg-border border border-border">
        <span className="invisible">{block}</span>
      </div>
    )
  }

  return (
    <button
      ref={ref}
      onClick={onAdd}
      aria-label={`Add ${block} to answer`}
      className="px-4 py-2 rounded-lg font-mono text-sm bg-bg-card border border-border text-text-primary cursor-grab active:cursor-grabbing select-none transition-colors hover:border-text-muted
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
      disabled={disabled}
    >
      {block}
    </button>
  )
}
