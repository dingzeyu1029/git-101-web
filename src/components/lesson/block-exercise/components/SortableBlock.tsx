import type { ReactNode } from 'react'
import { useSortable } from '@dnd-kit/react/sortable'

interface SortableBlockProps {
  id: string
  index: number
  children: ReactNode
  onRemove: () => void
  disabled: boolean
}

export default function SortableBlock({ id, index, children, onRemove, disabled }: SortableBlockProps) {
  const { ref, isDragging } = useSortable({ id, index, group: 'solution-area', disabled })

  if (isDragging) {
    return (
      <div
        ref={ref}
        className="px-4 py-2 rounded-lg font-mono text-sm bg-border"
      >
        <span className="invisible">{children}</span>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      data-block
      role="button"
      tabIndex={0}
      onClick={onRemove}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onRemove() } }}
      className="px-4 py-2 rounded-lg font-mono text-sm bg-text-primary text-white cursor-grab active:cursor-grabbing select-none
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {children}
    </div>
  )
}
